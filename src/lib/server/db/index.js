import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { DATABASE_URL } from "$env/static/private";
import * as schema from "./schema";

/**
 * Creates a singleton database client using `postgres-js`.
 * This client handles the connection pooling and is configured
 * using the `DATABASE_URL` from your environment variables.
 */
const client = postgres(DATABASE_URL, {
  // In production, you might want to configure SSL
  // ssl: 'require'
});

/**
 * The main Drizzle ORM database instance.
 * It's initialized with the postgres client and the defined schema.
 * You'll import this `db` object into your server-side files to
 * interact with the database.
 *
 * @example
 * import { db } from '$lib/server/db';
 * import { payments } from '$lib/server/db/schema';
 *
 * const allPayments = await db.select().from(payments);
 */
export const db = drizzle(client, { schema });
