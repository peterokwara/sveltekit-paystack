import { redirect, fail } from '@sveltejs/kit';
import { initializePaystackTransaction } from '$lib/server/services/payment/paystackService';
import { store } from '$lib/server/store';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ url }) => {
	const plan = url.searchParams.get('plan');
	const price = url.searchParams.get('price');
	const yearly = url.searchParams.get('yearly');

	if (!plan || !price) {
		throw redirect(303, '/');
	}

	return {
		plan,
		price: Number(price),
		yearly: yearly === 'true'
	};
};

/** @type {import('./$types').Actions} */
export const actions = {
	pay: async ({ request, url }) => {
		const formData = await request.formData();
		const email = formData.get('email')?.toString();
		const price = formData.get('price')?.toString();
		const plan = formData.get('plan')?.toString();

		if (!email || !price || !plan) {
			return fail(400, { message: 'Email, price, and plan are required.' });
		}

		const amountInKobo = Number(price) * 100;
		const transactionReference = `SKP-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
		const callbackUrl = `${url.origin}/payment-pending?ref=${transactionReference}`;

		// Store payment details in our in-memory store
		store.createPayment(transactionReference, {
			email,
			amount: amountInKobo,
			currency: 'KES'
		});

		try {
			const paystackResult = await initializePaystackTransaction({
				email,
				amount: amountInKobo,
				currency: 'KES',
				reference: transactionReference,
				callbackUrl: callbackUrl,
				metadata: {
					plan_name: plan
				}
			});

			if (paystackResult?.authorization_url) {
				throw redirect(303, paystackResult.authorization_url);
			} else {
				return fail(502, {
					message: 'Paystack authorization URL not received.'
				});
			}
		} catch (err) {
			if (
				typeof err === 'object' &&
				err !== null &&
				'status' in err &&
				err.status === 303
			) {
				throw err;
			}

			const errorMessage =
				err instanceof Error ? err.message : 'An unknown error occurred';

			console.error('Paystack initialization failed:', err);
			return fail(502, { message: `Payment provider error: ${errorMessage}` });
		}
	}
};
