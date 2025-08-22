<script lang="ts">
	import PricingSection from '$lib/components/landing/Pricing/PricingSection.svelte';
	import { page } from '$app/stores';

	const redirectUrl = $derived($page.url.searchParams.get('redirect') || '/app/dashboard');
</script>

<div class="bg-white">
	<header class="relative bg-white">
		<nav aria-label="Top" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="border-b border-gray-200">
				<div class="flex h-16 items-center justify-between">
					<!-- Logo -->
					<div class="ml-4 flex lg:ml-0">
						<a href="/">
							<span class="sr-only">Your Company</span>
							<h2 class="text-2xl font-bold text-black">Incln</h2>
						</a>
					</div>
				</div>
			</div>
		</nav>
	</header>
	<div class="text-center py-8">
		<h1 class="text-4xl font-bold">Paywall</h1>
		<p class="text-lg text-gray-600">Please choose a plan to continue.</p>
	</div>
	<PricingSection />
</div>
