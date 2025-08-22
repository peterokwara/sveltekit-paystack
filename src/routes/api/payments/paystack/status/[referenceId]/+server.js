import { json } from '@sveltejs/kit';
import { store } from '$lib/server/store';
import {
	getPaystackTransactionDetails,
	mapPaystackStatus
} from '$lib/server/services/payment/paystackService';

/**
 * API endpoint to check the status of a payment transaction.
 * @type {import('./$types').RequestHandler}
 */
export const GET = async ({ params }) => {
	const { referenceId } = params;

	if (!referenceId) {
		return json({ error: 'Reference ID is required' }, { status: 400 });
	}

	// 1. Check our internal store first
	const payment = store.getPayment(referenceId);
	if (payment?.status === 'completed') {
		return json({
			status: 'completed',
			message: 'Payment already verified.'
		});
	}

	// 2. If not completed, verify with Paystack
	const transactionDetails = await getPaystackTransactionDetails(referenceId);

	if (!transactionDetails) {
		return json({ status: 'failed', message: 'Could not verify transaction.' }, { status: 404 });
	}

	// 3. Map Paystack status to our internal status
	const internalStatus = mapPaystackStatus(transactionDetails.status);

	// 4. Update our in-memory store
	store.updatePaymentStatus(referenceId, internalStatus);

	// 5. Return the current status
	return json({
		status: internalStatus,
		message: `Transaction status: ${internalStatus}`
	});
};