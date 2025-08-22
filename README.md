# SvelteKit Paystack SaaS Boilerplate

Hello, fellow developer! So, you're thinking of leaving that 9-5, or maybe you've got a brilliant idea for a side hustle. You want to build a Software as a Service (SaaS) business, but the starting line seems so far away. This boilerplate is for you.

This isn't just a collection of files; it's a launchpad. It's designed to handle one of the most complex parts of any SaaS: getting paid. We've built a complete, realistic user authentication and payment flow using the power of **SvelteKit 5** and the reliability of **Paystack**, with a focus on the Kenyan market (using KES).

This template will get you somewhere solid along your journey, letting you focus on building your actual product, not the plumbing.

## Core Features

This boilerplate comes pre-configured with a modern, powerful stack and essential SaaS features:

-   **SvelteKit 5 (Runes Mode):** Built with the latest, most intuitive version of Svelte for a fantastic developer experience.
-   **Paystack Integration:** Securely process payments in **KES** right out of the box.
-   **Integrated Auth & Payment Flow:** A complete, end-to-end user journey that handles new sign-ups, existing users, and protected content.
-   **Mock Authentication:** A simple, cookie-based mock session system that simulates user login, allowing you to build and test your app before implementing a full auth solution.
-   **Protected Routes (Gatekeeping):** A server-side layout that protects your premium content, redirecting users to a login page or a paywall as needed.
-   **Dynamic Paywall:** A paywall that intelligently remembers where the user was trying to go and redirects them there after a successful payment.
-   **In-Memory "Database":** A simple in-memory store for tracking payments during a server session, perfect for getting started without database setup.
-   **Resilient Payment Verification:** A robust system that uses both real-time polling and backend webhooks to verify payments, ensuring the user's payment is recognized even if the webhook is delayed.
-   **Theming with TailwindCSS:** A beautiful, consistent theme across all pages, based on the design of the homepage.

---

## The User Flow Explained

This boilerplate shines in its handling of different user scenarios. Here’s a breakdown of the flows you get out of the box:

### Scenario 1: The Brand New User

This is the "happy path" for a new customer.

1.  **Pricing:** The user lands on the homepage, likes what they see, and clicks "Choose Plan" in the pricing section.
2.  **Checkout:** They are taken to the `/checkout` page with their plan details pre-filled. They enter their email for the first time.
3.  **Payment:** They are redirected to Paystack to complete the payment.
4.  **Verification & Login:** After paying, they are sent to a `/payment-pending` page. In the background, the app verifies the payment with Paystack and—crucially—**creates a session for them**, logging them in automatically.
5.  **Dashboard:** Once verified, they are seamlessly redirected to their brand new `/app/dashboard`.

### Scenario 2: The Logged-Out Existing User

This flow handles returning users who need to access protected content.

1.  **Access Attempt:** The user tries to go directly to `/app/dashboard`.
2.  **The Gatekeeper:** A server-side layout checks for a session and finds none. It redirects the user to `/login`, but cleverly appends their original destination: `/login?redirect=/app/dashboard`.
3.  **Login:** The user signs in. The server validates them and uses the `redirect` parameter to send them straight to `/app/dashboard`.
4.  **The Paywall:** The gatekeeper at `/app` runs again. This time, the user is logged in, but the system sees they don't have an active subscription. It redirects them to the `/paywall`, still remembering their final destination: `/paywall?redirect=/app/dashboard`.
5.  **Payment & Redirect:** The user chooses a plan and is sent to the checkout page. After payment, they are redirected to their original destination: `/app/dashboard`.

### Scenario 3: The New User via Registration

This flow handles users who try to access protected content and need to sign up first.

1.  **Access Attempt:** Same as above, the user tries to access `/app/dashboard`.
2.  **Gatekeeper -> Login:** They are redirected to `/login?redirect=/app/dashboard`.
3.  **Register:** They click the "Sign up" link, which takes them to `/register?redirect=/app/dashboard`, still preserving the destination.
4.  **Registration & Login:** They create an account. The server creates their user and immediately logs them in by setting a session cookie. They are then redirected to `/app/dashboard`.
5.  **Paywall & Checkout:** The flow now merges with Scenario 2. The user is logged in but has no subscription, so they are guided through the paywall and checkout process.

---

## Getting Started

Ready to build your dream? Here’s how to get this boilerplate up and running in minutes.

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/your-repo/sveltekit-paystack-saas.git
    cd sveltekit-paystack-saas
    ```

2.  **Install Dependencies**
    ```bash
    pnpm install
    ```

3.  **Paystack Configuration**

    To process payments, you need to get your API keys from Paystack and set up a webhook to receive events.

    **A. Get Your API Secret Key:**

    -   Log in to your [Paystack Dashboard](https://dashboard.paystack.com/).
    -   In the bottom-left corner, click on **Settings**.
    -   Go to the **API Keys & Webhooks** tab.
    -   You will see your **Test Secret Key**. This is what you need for development.
    -   Copy the example `.env` file:
        ```bash
        cp .env.example .env
        ```
    -   Open the new `.env` file and paste your key:
        ```
        SECRET_PAYSTACK_TEST_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        ```

    **B. Set Up Your Webhook for Local Development:**

    Paystack needs to send events to your running application (like `charge.success`). When you're developing on `localhost`, your app isn't accessible on the public internet. We can use a tool called **ngrok** to fix this.

    -   **Install ngrok:** Follow the instructions on the [ngrok website](https://ngrok.com/download) to download and install it.

    -   **Run Your SvelteKit App:** Start your app on the default port (5173):
        ```bash
        pnpm run dev
        ```

    -   **Expose Your Port with ngrok:** In a **new terminal window**, run the following command:
        ```bash
        ngrok http 5173
        ```

    -   **Get Your Webhook URL:** ngrok will give you a public "Forwarding" URL (it will look something like `https://random-string.ngrok-free.app`). Your webhook URL is this public URL plus the webhook path from this project:
        `https://random-string.ngrok-free.app/api/webhooks/paystack`

    -   **Add the URL to Paystack:**
        -   Go back to the **API Keys & Webhooks** page on your Paystack Dashboard.
        -   In the "Webhook URL" field (for Test mode), paste the full ngrok URL you just constructed.
        -   Click "Save Changes".

    Now, when a payment is made in your local test environment, Paystack will send the success event to the ngrok URL, which will forward it to your running SvelteKit application.

4.  **Run the Development Server**
    ```bash
    pnpm run dev
    ```

Your app is now running at `http://localhost:5173`.

---

## Limitations: The Honest Truth

This boilerplate is a powerful starting point, but it is not a production-ready application. Here are the key limitations you should be aware of:

-   **No Real Database:** The project uses a simple JavaScript `Map` as an in-memory store. This is fantastic for demos and getting started, but it **resets every time the server restarts.** You will need to replace this with a real database for production.
-   **Mock Authentication:** The user authentication is simulated. There is no password hashing, and user "creation" is just the act of setting a cookie. This is a placeholder for a real authentication system.
-   **Single Currency:** The currency is currently hardcoded to **KES** (Kenyan Shilling). This can be easily changed, but there is no multi-currency support built-in.
-   **No Subscription Management:** The flow handles a one-time payment beautifully, but it does not include logic for recurring billing, subscription cancellations, or checking if a subscription is still valid after a certain period.

---

## The Roadmap: From Boilerplate to Full SaaS

This is where your journey truly begins. Here is a clear, step-by-step guide on how to extend this boilerplate into a full-fledged SaaS application.

### Step 1: Integrate a Real Database

This is your first and most important step.

-   **Choose a Database:** PostgreSQL is a fantastic, robust choice that works well with SvelteKit.
-   **Choose an ORM:** [Drizzle ORM](https://orm.drizzle.team/) is a modern, lightweight, and type-safe ORM that is an excellent fit for SvelteKit. The project is already set up with some Drizzle dependencies.
-   **Implementation:**
    1.  Create your database schema (e.g., `users`, `payments`, `subscriptions` tables).
    2.  Replace the logic in `src/lib/server/store.js` with actual database calls using your ORM. Instead of `paymentStore.set(...)`, you'll be doing `db.insert(...).values(...)`.

### Step 2: Implement Real Authentication

Replace the mock session with a secure, production-ready authentication system.

-   **Choose an Auth Library:** [Lucia Auth](https://lucia-auth.com/) is a great, SvelteKit-native library that gives you full control. [Auth.js (SvelteKitAuth)](https://authjs.dev/) is another excellent, popular choice.
-   **Implementation:**
    1.  Remove the mock logic from `src/hooks.server.ts`.
    2.  Follow the documentation of your chosen auth library to set up login, registration, and session management.
    3.  Update the `login` and `register` server actions in `src/routes/login/+page.server.js` and `src/routes/register/+page.server.js` to use your auth library to create real users in your database, including hashing passwords with a library like `bcrypt`.

### Step 3: Build Real Subscription Logic

This is the core of your SaaS business model.

-   **Database Schema:** Add a `subscription_status` (e.g., `active`, `inactive`, `cancelled`) and a `subscription_ends_at` (a timestamp) field to your `users` table.
-   **Webhook Logic:** In `src/routes/api/webhooks/paystack/+server.js`, when you receive a `charge.success` event, don't just update the payment status. You should:
    1.  Find the user associated with the payment.
    2.  Update their `subscription_status` to `active`.
    3.  Set their `subscription_ends_at` to the appropriate date (e.g., one month or one year from now).
-   **Gatekeeper Logic:** In `src/routes/app/+layout.server.ts`, change the check from the mock `accessContext` to a real database query. Check if `user.subscription_status === 'active'` and if `user.subscription_ends_at` is in the future.

### Step 4: Flesh Out Your Dashboard & App

This is the fun part!

-   The `/app/dashboard` page is your canvas. This is where you build the actual features that your customers are paying for.
-   The gatekeeper you've built will protect all routes inside the `/app` directory, so you can confidently build out your application here.

---

## A Final Word

Building a SaaS is a marathon, not a sprint. This boilerplate is designed to get you through the first few kilometers, handling the tricky parts so you can focus on your vision.

This is just the beginning.

Good luck on your journey. Now, go build something amazing.