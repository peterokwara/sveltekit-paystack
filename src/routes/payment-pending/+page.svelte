<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { toast } from 'svelte-sonner';

	type PaymentStatus = 'pending' | 'completed' | 'failed';

	let { data } = $props();

	let currentStatus: PaymentStatus = $state(data.paymentDetails?.status as PaymentStatus || 'pending');
	let attempts = $state(0);
	const MAX_ATTEMPTS = 15;
	let pollingIntervalId: NodeJS.Timeout | null = null;

	async function checkPaymentStatus() {
		if (currentStatus === 'completed' || currentStatus === 'failed') {
			if (pollingIntervalId) clearInterval(pollingIntervalId);
			return;
		}

		try {
			const referenceId = data.paymentDetails?.provider_reference;
			if (!referenceId) {
				throw new Error('Payment reference ID not found in page data.');
			}

			const response = await fetch(`/api/payments/paystack/status/${referenceId}`);
			if (!response.ok) {
				throw new Error(`API responded with status ${response.status}`);
			}

			const result = await response.json();

			if (result.data?.internal_status) {
				currentStatus = result.data.internal_status;
			}
		} catch (err) {
			console.error('Polling error:', err);
			if (pollingIntervalId) clearInterval(pollingIntervalId);
			currentStatus = 'failed';
		}
	}

	onMount(() => {
		if (currentStatus === 'pending') {
			pollingIntervalId = setInterval(() => {
				attempts++;
				if (attempts > MAX_ATTEMPTS) {
					if (pollingIntervalId) clearInterval(pollingIntervalId);
					toast.error('Payment verification timed out.');
					currentStatus = 'failed';
				} else {
					checkPaymentStatus();
				}
			}, 4000); // Poll every 4 seconds
		}

		// Cleanup function
		return () => {
			if (pollingIntervalId) clearInterval(pollingIntervalId);
		};
	});

	// Reactive effect to handle redirection
	$effect(() => {
		if (currentStatus === 'completed') {
			if (pollingIntervalId) clearInterval(pollingIntervalId);
			toast.success('Payment successful!');
			const redirectUrl = '/app/dashboard';
			setTimeout(() => goto(redirectUrl, { replaceState: true }), 2000);
		} else if (currentStatus === 'failed') {
			if (pollingIntervalId) clearInterval(pollingIntervalId);
			toast.error('Payment failed or was canceled.');
			setTimeout(() => goto('/checkout?status=failed', { replaceState: true }), 3000);
		}
	});
</script>

<div class="bg-white">
	<header class="relative bg-white">
		<nav aria-label="Top" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="border-b border-gray-200">
				<div class="flex h-16 items-center justify-center">
					<!-- Logo -->
					<div class="ml-4 flex lg:ml-0">
						<a href="/">
							<span class="sr-only">Your Company</span>
							<img
								src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
								alt="Company logo"
								class="h-8 w-auto"
							/>
						</a>
					</div>
				</div>
			</div>
		</nav>
	</header>

	<main
		class="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8"
	>
		<div class="w-full max-w-md text-center">
			{#if currentStatus === 'pending'}
				<div>
					<svg
						class="mx-auto h-12 w-12 animate-spin text-indigo-600"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							class="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							stroke-width="4"
						></circle>
						<path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
					<h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						Processing Payment
					</h1>
					<p class="mt-4 text-base text-gray-500">
						Please wait while we confirm your transaction. This may take a moment. Do not close this
						page.
					</p>
				</div>
			{:else if currentStatus === 'completed'}
				<div>
					<svg
						class="mx-auto h-12 w-12 text-green-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						Payment Successful!
					</h1>
					<p class="mt-4 text-base text-gray-500">
						Your payment has been confirmed. You will be redirected shortly.
					</p>
				</div>
			{:else if currentStatus === 'failed'}
				<div>
					<svg
						class="mx-auto h-12 w-12 text-red-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
						/>
					</svg>
					<h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						Payment Failed
					</h1>
					<p class="mt-4 text-base text-gray-500">
						We could not confirm your payment. You will be redirected to try again.
					</p>
				</div>
			{/if}
		</div>
	</main>
</div>