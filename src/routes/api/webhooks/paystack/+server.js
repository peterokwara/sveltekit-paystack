import { json, error } from "@sveltejs/kit";
import crypto from "crypto";
import { env } from "$env/dynamic/private";
import { db } from "$lib/server/db";
import { payments } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import { syncPaymentWithPaystackDetails } from "$lib/server/services/payment/paystackService";

/**
 * Handles incoming webhooks from Paystack.
 * @type {import('./$types').RequestHandler}
 */
export const POST = async ({ request }) => {
  const PAYSTACK_SECRET_KEY = env.SECRET_PAYSTACK_TEST_KEY;

  if (!PAYSTACK_SECRET_KEY) {
    console.error("Paystack secret key is not configured.");
    // Throw a SvelteKit error to ensure a proper server error response.
    throw error(
      500,
      "Server configuration error: Paystack secret key is not set.",
    );
  }

  // 1. Validate the Paystack Signature
  const signature = request.headers.get("x-paystack-signature");
  const body = await request.text(); // Read the body as raw text

  // Create a hash using your secret key
  const hash = crypto
    .createHmac("sha512", PAYSTACK_SECRET_KEY) // PAYSTACK_SECRET_KEY is now guaranteed to be a string
    .update(body)
    .digest("hex");

  // Compare the generated hash with the signature from the header
  if (hash !== signature) {
    return json({ error: "Invalid signature" }, { status: 401 });
  }

  // 2. Parse the Event Payload
  const event = JSON.parse(body);
  const { reference } = event.data;

  // It's good practice to check for a reference. Some events might not have one.
  if (!reference) {
    // Acknowledge the webhook but take no action.
    return json(
      { message: "Webhook received, but no reference found." },
      { status: 200 },
    );
  }

  // 3. Process the Specific Event (e.g., 'charge.success')
  if (event.event === "charge.success") {
    try {
      // Find the payment record in your DB using the unique reference
      const paymentRecord = await db.query.payments.findFirst({
        where: eq(payments.providerReference, reference),
      });

      // If the payment record exists, sync its status.
      // The sync function is idempotent, so it's safe to call even if polling already processed it.
      if (paymentRecord) {
        await syncPaymentWithPaystackDetails(
          paymentRecord.id,
          event.data, // The `event.data` object from Paystack is the transaction details
          paymentRecord.metadata || {},
        );
      }
    } catch (err) {
      // If the database lookup or update fails, log the error and return a 500.
      // This signals to Paystack that the webhook delivery failed, and it will attempt to resend it.
      console.error(
        `Webhook Error: Could not process reference ${reference}`,
        err,
      );
      return json(
        { error: "Internal server error while processing webhook" },
        { status: 500 },
      );
    }
  }

  // 4. Acknowledge Receipt
  // Always return a 200 OK to Paystack to let them know you've received the event.
  return json(
    { message: "Webhook received and acknowledged" },
    { status: 200 },
  );
};
