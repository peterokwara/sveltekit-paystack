import { error } from "@sveltejs/kit";

/**
 * Server-side load function for the payment pending page.
 * It passes the transaction reference from the URL to the page.
 * @type {import('./$types').PageServerLoad}
 */
export async function load({ url }) {
  const referenceId = url.searchParams.get("ref");

  if (!referenceId) {
    throw error(
      400,
      "No payment reference provided. Please check the URL and try again.",
    );
  }

  // Since the database is removed, we just pass the reference to the page.
  // The page will use this reference to poll for the payment status.
  return {
    paymentDetails: {
      status: "pending", // The initial status is always pending
      provider_reference: referenceId,
    },
  };
}
