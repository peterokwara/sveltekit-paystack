import { env } from "$env/dynamic/private";
import { db } from "$lib/server/db";
import { payments } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

// Runtime check to ensure the environment variable is loaded.
// Using $env/dynamic/private reads the value at runtime.
if (!env.SECRET_PAYSTACK_TEST_KEY) {
  throw new Error("SECRET_PAYSTACK_TEST_KEY is not defined in your .env file.");
}

const PAYSTACK_SECRET = env.SECRET_PAYSTACK_TEST_KEY;

/**
 * @typedef {import('$lib/server/db/schema').payments['$inferSelect']} PaymentRecord
 */

/**
 * Initializes a transaction with Paystack.
 * @param {object} args - The arguments for the transaction.
 * @param {string} args.email - Customer's email address.
 * @param {number} args.amount - Amount in the smallest currency unit (e.g., kobo, cents).
 * @param {string} args.currency - The currency of the transaction (e.g., 'NGN').
 * @param {string} args.reference - A unique reference for the transaction.
 * @param {string} args.callbackUrl - The URL to redirect to after payment.
 * @param {Record<string, unknown>} [args.metadata] - Optional metadata.
 * @returns {Promise<any>} The data returned by Paystack, including the authorization_url.
 */
export async function initializePaystackTransaction(args) {
  const response = await fetch(
    "https://api.paystack.co/transaction/initialize",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
    },
  );

  const data = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(
      data.message || "Failed to initialize transaction with Paystack",
    );
  }
  return data.data;
}

/**
 * Verifies a transaction's details with Paystack using its reference.
 * @param {string} referenceId - The reference of the transaction to verify.
 * @returns {Promise<any|null>} The transaction details or null if the request fails.
 */
export async function getPaystackTransactionDetails(referenceId) {
  const response = await fetch(
    `https://api.paystack.co/transaction/verify/${encodeURIComponent(referenceId)}`,
    {
      headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` },
    },
  );
  const data = await response.json();
  if (!response.ok || !data.status) {
    console.error(
      `Paystack verification failed for reference ${referenceId}:`,
      data.message,
    );
    return null;
  }
  return data.data;
}

/**
 * Maps a Paystack status string to our internal application status.
 * @param {string} paystackStatus - The status from Paystack (e.g., 'success', 'failed').
 * @returns {'completed' | 'failed' | 'pending'} Our internal status.
 */
export function mapPaystackStatus(paystackStatus) {
  switch (paystackStatus?.toLowerCase()) {
    case "success":
      return "completed";
    case "failed":
    case "abandoned":
      return "failed";
    default:
      return "pending";
  }
}

/**
 * Updates the local payment record with details from Paystack using Drizzle ORM.
 * @param {number} paymentId - The ID of the payment record in our database.
 * @param {any} paystackData - The transaction data object from Paystack.
 * @param {object} [existingMetadata={}] - The existing metadata from the local payment record.
 * @returns {Promise<PaymentRecord | undefined>} The updated payment record from our database.
 */
export async function syncPaymentWithPaystackDetails(
  paymentId,
  paystackData,
  existingMetadata = {},
) {
  const internalStatus = mapPaystackStatus(paystackData.status);

  const mergedMetadata = {
    ...existingMetadata,
    paystack_status: paystackData.status,
    paystack_channel: paystackData.channel,
  };

  const [updatedRecord] = await db
    .update(payments)
    .set({
      status: internalStatus,
      providerPaymentId: String(paystackData.id),
      providerResponse: paystackData,
      metadata: mergedMetadata,
      updatedAt: new Date(),
    })
    .where(eq(payments.id, paymentId))
    .returning();

  if (
    updatedRecord &&
    updatedRecord.status === "completed" &&
    !updatedRecord.successActionsExecuted
  ) {
    await handleSuccessfulPayment(updatedRecord);
    updatedRecord.successActionsExecuted = true;
  }

  return updatedRecord;
}

/**
 * Handles post-payment success logic, designed to be idempotent.
 * @param {PaymentRecord} paymentRecord - The payment record from our database.
 */
export async function handleSuccessfulPayment(paymentRecord) {
  await db
    .update(payments)
    .set({
      successActionsExecuted: true,
      updatedAt: new Date(),
    })
    .where(eq(payments.id, paymentRecord.id));

  console.log(
    `Executing successful payment actions for payment ID: ${paymentRecord.id}...`,
  );
  console.log(`Activating subscription for user ${paymentRecord.userId}...`);
}
