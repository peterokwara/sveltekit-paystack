import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { payments } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import {
  getPaystackTransactionDetails,
  syncPaymentWithPaystackDetails,
} from "$lib/server/services/payment/paystackService";

/**
 * Handles GET requests to check the status of a payment transaction.
 * @type {import('./$types').RequestHandler}
 */
export const GET = async ({ params }) => {
  const { referenceId } = params;
  if (!referenceId) {
    return json(
      { message: "Payment reference ID is required." },
      { status: 400 },
    );
  }

  // 1. Find the local payment record by its provider reference using Drizzle
  let localPayment;
  try {
    localPayment = await db.query.payments.findFirst({
      where: eq(payments.providerReference, referenceId),
    });
  } catch (err) {
    console.error("Error fetching local payment record:", err);
    return json(
      { message: "An internal error occurred while fetching payment data." },
      { status: 500 },
    );
  }

  if (!localPayment) {
    return json(
      { message: "Payment record not found in our system." },
      { status: 404 },
    );
  }

  // 2. If the payment status in our database is already final, return it immediately.
  if (localPayment.status === "completed" || localPayment.status === "failed") {
    return json({ data: { internal_status: localPayment.status } });
  }

  // 3. If our record is still pending, query Paystack's API for the latest status.
  const paystackTransactionData =
    await getPaystackTransactionDetails(referenceId);

  if (!paystackTransactionData) {
    // If Paystack doesn't find the transaction, we can't confirm it.
    // We'll keep our status as 'pending' and let the client poll again.
    return json({
      data: { internal_status: "pending", provider_status: "not_found" },
    });
  }

  // 4. Sync our database with the definitive status from Paystack.
  const updatedPaymentRecord = await syncPaymentWithPaystackDetails(
    localPayment.id,
    paystackTransactionData,
    // Ensure metadata is passed as an object, even if it's null in the DB
    localPayment.metadata || {},
  );

  if (!updatedPaymentRecord) {
    // This indicates a problem with the sync process
    console.error(
      `Failed to sync payment record for reference: ${referenceId}`,
    );
    return json(
      { message: "Failed to update payment status." },
      { status: 500 },
    );
  }

  // 5. Return the newly updated status to the frontend.
  return json({
    data: {
      internal_status: updatedPaymentRecord.status,
      provider_status: paystackTransactionData.status,
      verified: paystackTransactionData.status === "success",
    },
  });
};
