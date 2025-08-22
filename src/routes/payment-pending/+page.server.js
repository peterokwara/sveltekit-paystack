import { db } from '$lib/server/db';
import { payments } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';

/**
 * Server-side load function for the payment pending page.
 * It securely fetches the initial state of a payment from the database
 * using the transaction reference from the URL.
 * @type {import('./$types').PageServerLoad}
 */
export async function load({ url }) {
	const referenceId = url.searchParams.get('ref');

	if (!referenceId) {
		throw error(400, 'No payment reference provided. Please check the URL and try again.');
	}

	const paymentRecord = await db.query.payments.findFirst({
		where: eq(payments.providerReference, referenceId)
	});

	if (!paymentRecord) {
		throw error(404, 'The payment record for the provided reference was not found.');
	}

	// Return a simplified version of the payment record to avoid exposing sensitive data
	// to the client-side, even though it's just for the page's own use.
	return {
		paymentDetails: {
			status: paymentRecord.status,
			provider_reference: paymentRecord.providerReference
		}
	};
}
