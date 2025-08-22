import { json, error } from '@sveltejs/kit';
import crypto from 'crypto';
import { env } from '$env/dynamic/private';
import { store } from '$lib/server/store';

/**
 * Handles incoming webhooks from Paystack.
 * @type {import('./$types').RequestHandler}
 */
export const POST = async ({ request }) => {
	const PAYSTACK_SECRET_KEY = env.SECRET_PAYSTACK_TEST_KEY;

	if (!PAYSTACK_SECRET_KEY) {
		console.error('Paystack secret key is not configured.');
		throw error(500, 'Server configuration error: Paystack secret key is not set.');
	}

	// 1. Validate the Paystack Signature
	const signature = request.headers.get('x-paystack-signature');
	const body = await request.text(); // Read the body as raw text

	const hash = crypto.createHmac('sha512', PAYSTACK_SECRET_KEY).update(body).digest('hex');

	if (hash !== signature) {
		return json({ error: 'Invalid signature' }, { status: 401 });
	}

	// 2. Parse the Event Payload
	const event = JSON.parse(body);
	console.log(`Received verified Paystack event: ${event.event}`);

	// 3. Handle the 'charge.success' event
	if (event.event === 'charge.success') {
		const reference = event.data.reference;
		if (reference) {
			console.log(`Updating payment status for reference: ${reference}`);
			store.updatePaymentStatus(reference, 'completed');
		}
	}

	// 4. Acknowledge Receipt
	return json({ message: 'Webhook received and acknowledged' }, { status: 200 });
};