import { json, error } from "@sveltejs/kit";
import crypto from "crypto";
import { env } from "$env/dynamic/private";

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
    .createHmac("sha52", PAYSTACK_SECRET_KEY)
    .update(body)
    .digest("hex");

  // Compare the generated hash with the signature from the header
  if (hash !== signature) {
    return json({ error: "Invalid signature" }, { status: 401 });
  }

  // 2. Parse the Event Payload & Log It
  const event = JSON.parse(body);
  console.log(
    `Received verified Paystack event: ${event.event} for reference: ${event.data.reference}`,
  );

  // 3. Acknowledge Receipt
  // Always return a 200 OK to Paystack to let them know you've received the event.
  // Since we have no database, we just log the event and acknowledge it.
  return json(
    { message: "Webhook received and acknowledged" },
    { status: 200 },
  );
};
