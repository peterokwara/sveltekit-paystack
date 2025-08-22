import { redirect } from '@sveltejs/kit';
import { store } from '$lib/server/store';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ url }) => {
	const ref = url.searchParams.get('ref');

	if (!ref) {
		throw redirect(303, '/');
	}

	const payment = store.getPayment(ref);

	if (payment?.status === 'completed') {
		const redirectTo = store.getPayment(ref)?.metadata?.redirect || '/app/dashboard';
		throw redirect(303, redirectTo);
	}

	return {
		paymentDetails: payment
	};
};