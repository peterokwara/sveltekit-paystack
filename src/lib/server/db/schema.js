import {
  pgTable,
  text,
  real,
  timestamp,
  jsonb,
  boolean,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * Represents the 'payments' table in the PostgreSQL database.
 * This table stores all transaction records initiated through the application.
 */
export const payments = pgTable("payments", {
  // A unique serial integer for each payment record, serving as the primary key.
  id: serial("id").primaryKey(),

  // The ID of the user who initiated the payment. This should correspond to your users table.
  userId: text("user_id").notNull(),

  // The amount of the transaction. Using `real` for floating-point precision.
  amount: real("amount").notNull(),

  // The currency of the transaction (e.g., 'NGN', 'USD').
  currency: varchar("currency", { length: 3 }).notNull(),

  // The current status of the payment ('pending', 'completed', 'failed').
  status: text("status", { enum: ["pending", "completed", "failed"] })
    .default("pending")
    .notNull(),

  // The payment provider used for this transaction (e.g., 'paystack').
  provider: text("provider").notNull(),

  // Our internal unique reference generated for the transaction.
  providerReference: text("provider_reference").unique().notNull(),

  // The unique identifier for the transaction from the provider (e.g., Paystack's transaction ID).
  providerPaymentId: text("provider_payment_id"),

  // The full response object from the payment provider (from webhooks or API verification).
  // Stored as JSONB for efficient querying.
  providerResponse: jsonb("provider_response"),

  // Any additional metadata you want to store with the payment, such as plan IDs or redirect URLs.
  metadata: jsonb("metadata"),

  // A flag to ensure that post-payment actions (like activating a subscription) are only run once.
  successActionsExecuted: boolean("success_actions_executed")
    .default(false)
    .notNull(),

  // The timestamp when the payment record was created.
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  // The timestamp when the payment record was last updated.
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
