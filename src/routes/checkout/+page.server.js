import { redirect, fail } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { payments } from "$lib/server/db/schema";
import { initializePaystackTransaction } from "$lib/server/services/payment/paystackService";
import { eq } from "drizzle-orm";

// Mock product data for demonstration. In a real app, you'd load this from your database.
const products = {
  prod_12345: {
    paymentMethod: "paystack",
    currency: "NGN",
    name: "Standard Plan",
    product: "prod_12345",
    price: 5000,
  },
};

/** @type {import('./$types').PageServerLoad} */
export const load = async () => {
  // This load function makes a product available to the page.
  return {
    selectedProduct: products["prod_12345"],
  };
};

/**
 * Server-side actions for the checkout page.
 * @type {import('./$types').Actions}
 */
export const actions = {
  /**
   * Default action to handle payment initialization with Paystack.
   * This is triggered by a form submission on the checkout page.
   */
  pay: async ({ request, url, locals }) => {
    // 1. Authenticate the user
    const appLocals =
      /** @type {App.Locals & { user?: { id: string; email: string } }} */ (
        locals
      );
    if (!appLocals.user) {
      return fail(401, { message: "You must be signed in to make a payment." });
    }
    const { id: userId, email } = appLocals.user;

    // 2. Extract and validate data from the submitted form
    const formData = await request.formData();
    const currency = formData.get("currency")?.toString();
    const finalRedirectPath = formData.get("redirect")?.toString() || "/";
    const planName = formData.get("plan_name")?.toString();
    const planId = formData.get("plan_id")?.toString();

    // SERVER-SIDE PRICE VERIFICATION AND CALCULATION
    if (!planId) {
      return fail(400, { message: "Product ID is missing." });
    }
    // @ts-ignore
    const product = products[planId];
    if (!product) {
      return fail(404, { message: "Product not found." });
    }

    // Recalculate total on the server to ensure price integrity
    const subtotal = product.price;
    const taxes = subtotal * 0.08; // 8% tax
    const shipping = 14.0; // $14 shipping
    const totalAmount = subtotal + taxes + shipping;

    if (!currency) {
      return fail(400, {
        message: "Currency is required.",
      });
    }

    // 3. Generate a unique reference for this transaction
    const transactionReference = `SKP-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    const metadata = {
      plan_name: planName,
      plan_id: planId,
      redirect: finalRedirectPath, // Store final success path
    };

    // 4. Create a 'pending' payment record in our database
    let newPayment;
    try {
      [newPayment] = await db
        .insert(payments)
        .values({
          userId,
          amount: totalAmount,
          currency: currency.toUpperCase(),
          provider: "paystack",
          providerReference: transactionReference,
          metadata,
        })
        .returning();
    } catch (dbError) {
      console.error("Failed to create pending payment record:", dbError);
      return fail(500, {
        message: "Could not initiate payment due to a database error.",
      });
    }

    // 5. Define the URL where Paystack will redirect the user after payment
    const callbackUrl = `${url.origin}/payment-pending?ref=${transactionReference}&redirect=${encodeURIComponent(finalRedirectPath)}`;

    // 6. Call the Paystack service to get a payment URL
    try {
      const amountInKoboOrCents = Math.round(totalAmount * 100);

      const paystackResult = await initializePaystackTransaction({
        email,
        amount: amountInKoboOrCents,
        currency: currency.toUpperCase(),
        reference: transactionReference,
        callbackUrl: callbackUrl,
        metadata: {
          payment_id: newPayment.id, // Our internal DB ID
          user_id: userId,
          ...metadata,
        },
      });

      if (paystackResult?.authorization_url) {
        throw redirect(303, paystackResult.authorization_url);
      } else {
        return fail(502, {
          message: "Paystack authorization URL not received.",
        });
      }
    } catch (err) {
      // SvelteKit's `redirect` is thrown as an exception. We need to check for it.
      if (
        typeof err === "object" &&
        err !== null &&
        "status" in err &&
        err.status === 303
      ) {
        throw err; // Re-throw the redirect to let SvelteKit handle it
      }

      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";

      await db
        .update(payments)
        .set({
          status: "failed",
          providerResponse: {
            error: `Paystack initialization failed: ${errorMessage}`,
          },
          updatedAt: new Date(),
        })
        .where(eq(payments.id, newPayment.id));

      console.error("Paystack initialization failed:", err);
      // Return a `fail` object to populate the `form` prop on the frontend.
      return fail(502, { message: `Payment provider error: ${errorMessage}` });
    }
  },
};
