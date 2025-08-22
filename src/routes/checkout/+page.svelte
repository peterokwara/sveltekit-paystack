<script lang="js">
    import { enhance } from "$app/forms";
    import { toast } from "svelte-sonner";

    /**
     * @type {{
     *   data: import('./$types').PageData,
     *   form: import('./$types').ActionData
     * }}
     */
    let { data, form } = $props();

    let isLoading = $state(false);

    // A reactive effect to show an error toast when the form action fails
    $effect(() => {
        if (form && form.message) {
            toast.error(form.message);
        }
    });

    const product = data.selectedProduct;
    const subtotal = $derived(product ? product.price : 0);
    const taxes = $derived(subtotal * 0.08); // Example tax rate: 8%
    const shipping = $derived(subtotal > 0 ? 14.0 : 0); // Example flat shipping rate
    const total = $derived(subtotal + taxes + shipping);

    /**
     * Formats a number as a currency string.
     * @param {number} amount - The amount to format.
     * @param {string} currencyCode - The currency code (e.g., 'NGN', 'USD').
     * @returns {string}
     */
    function formatCurrency(amount, currencyCode = "NGN") {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currencyCode,
        }).format(amount);
    }
</script>

<div class="bg-white">
    <header
        class="flex items-center justify-between px-4 py-10 sm:px-6 sm:py-8 lg:px-8"
    >
        <a href="/">
            <span class="sr-only">SvelteKit Paystack</span>
            <img
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                alt="Company Logo"
                class="h-8 w-auto"
            />
        </a>
        <div class="hidden sm:flex sm:items-center sm:space-x-8">
            <a href="/" class="text-sm font-medium text-gray-700"
                >Contact support</a
            >
            <a href="/" class="-m-2 p-2 text-gray-400 hover:text-gray-500">
                <span class="sr-only">Account</span>
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    aria-hidden="true"
                    class="size-6"
                >
                    <path
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </a>
        </div>
    </header>

    <main
        class="mx-auto max-w-7xl px-4 pt-4 pb-16 sm:px-6 sm:pt-8 sm:pb-24 lg:px-8 xl:px-2 xl:pt-14"
    >
        <h1 class="sr-only">Checkout</h1>

        <div
            class="mx-auto grid max-w-lg grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2"
        >
            <div class="mx-auto w-full max-w-lg">
                <h2 class="sr-only">Order summary</h2>

                {#if product}
                    <div class="flow-root">
                        <ul role="list" class="-my-6 divide-y divide-gray-200">
                            <li class="flex space-x-6 py-6">
                                <img
                                    src="https://tailwindcss.com/plus-assets/img/ecommerce-images/checkout-page-05-product-01.jpg"
                                    alt="Front of women's basic tee in heather gray."
                                    class="size-24 flex-none rounded-md bg-gray-100 object-cover"
                                />
                                <div class="flex-auto">
                                    <div
                                        class="space-y-1 sm:flex sm:items-start sm:justify-between sm:space-x-6"
                                    >
                                        <div
                                            class="flex-auto space-y-1 text-sm font-medium"
                                        >
                                            <h3 class="text-gray-900">
                                                <a href="/">{product.name}</a>
                                            </h3>
                                            <p class="text-gray-900">
                                                {formatCurrency(
                                                    product.price,
                                                    product.currency,
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <dl
                        class="mt-10 space-y-6 text-sm font-medium text-gray-500"
                    >
                        <div class="flex justify-between">
                            <dt>Subtotal</dt>
                            <dd class="text-gray-900">
                                {formatCurrency(subtotal, product.currency)}
                            </dd>
                        </div>
                        <div class="flex justify-between">
                            <dt>Taxes</dt>
                            <dd class="text-gray-900">
                                {formatCurrency(taxes, product.currency)}
                            </dd>
                        </div>
                        <div class="flex justify-between">
                            <dt>Shipping</dt>
                            <dd class="text-gray-900">
                                {formatCurrency(shipping, product.currency)}
                            </dd>
                        </div>
                        <div
                            class="flex justify-between border-t border-gray-200 pt-6 text-gray-900"
                        >
                            <dt class="text-base">Total</dt>
                            <dd class="text-base">
                                {formatCurrency(total, product.currency)}
                            </dd>
                        </div>
                    </dl>
                {:else}
                    <p class="text-center text-gray-500">
                        No product selected for purchase.
                    </p>
                {/if}
            </div>

            <div class="mx-auto w-full max-w-lg">
                <form
                    method="POST"
                    action="?/pay"
                    class="mt-6"
                    use:enhance={() => {
                        isLoading = true;
                        return async ({ update }) => {
                            await update();
                            isLoading = false;
                        };
                    }}
                >
                    {#if product}
                        <input type="hidden" name="amount" value={total} />
                        <input
                            type="hidden"
                            name="currency"
                            value={product.currency}
                        />
                        <input
                            type="hidden"
                            name="plan_name"
                            value={product.name}
                        />
                        <input
                            type="hidden"
                            name="plan_id"
                            value={product.product}
                        />
                        <input
                            type="hidden"
                            name="redirect"
                            value="/payment/success"
                        />

                        <h2 class="text-lg font-medium text-gray-900">
                            Contact information
                        </h2>

                        <div class="mt-6">
                            <label
                                for="email-address"
                                class="block text-sm font-medium text-gray-700"
                                >Email address</label
                            >
                            <div class="mt-2">
                                <input
                                    id="email-address"
                                    type="email"
                                    name="email-address"
                                    autocomplete="email"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            class="mt-6 w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
                        >
                            {#if isLoading}
                                Processing...
                            {:else}
                                Pay with Paystack ({formatCurrency(
                                    total,
                                    product.currency,
                                )})
                            {/if}
                        </button>
                    {:else}
                        <p class="text-center text-gray-500">
                            Please select a product to proceed.
                        </p>
                    {/if}
                </form>
            </div>
        </div>
    </main>
</div>
