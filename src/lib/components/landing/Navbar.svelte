<script lang="ts">
	import { onMount } from 'svelte';

	let isMobileMenuOpen = $state(false);

	const menuItems = [
		{ text: 'Home', url: '#home' },
		{ text: 'Our services', url: '#features' },
		{ text: 'About', url: '#benefits' },
		{ text: 'Contact', url: '#contact' }
	];

	const handleMobileMenuToggle = (event: Event) => {
		event.stopPropagation();
		isMobileMenuOpen = !isMobileMenuOpen;
	};

	const handleMobileMenuClose = () => {
		isMobileMenuOpen = false;
	};

	onMount(() => {
		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				isMobileMenuOpen = false;
			}
		};
		document.addEventListener('keydown', handleEscapeKey);

		return () => {
			document.removeEventListener('keydown', handleEscapeKey);
		};
	});

	$effect(() => {
		if (isMobileMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	});
</script>

<div class="navbar-home top-0 w-full bg-transparent py-2 lg:relative lg:py-5 z-50">
	<nav class="sticky top-0 left-0 right-0 z-10 mx-auto max-w-4xl px-5 py-3 lg:max-w-5xl lg:border-none lg:py-4">
		<div class="flex items-center justify-between">
			<button>
				<div class="header-logo flex items-center space-x-2">
					<h2 class="text-2xl font-bold text-black">Incln</h2>
				</div>
			</button>
			<div class="header-menu hidden lg:block">
				<ul class="flex space-x-10 text-sm font-semibold text-zinc-700/60">
					{#each menuItems as menuItem}
						<li
							class="w-fit border-b border-transparent transition-colors duration-100 ease-linear hover:border-zinc-900/90 hover:text-zinc-900/90"
						>
							<a href={menuItem.url}>
								<button>{menuItem.text}</button>
							</a>
						</li>
					{/each}
				</ul>
			</div>
			<div class="header-button space-x-2">
				<div class="hidden lg:flex lg:items-center">
					<a
						href="#pricing"
						class="flex items-center justify-center rounded-full border border-black px-6 py-2.5 font-semibold text-black transition hover:shadow-lg hover:drop-shadow"
					>
						<span>Join now</span>
					</a>
				</div>
			</div>
			<div class="flex items-center justify-center lg:hidden">
				<button
					class={`advanced-setting-toggle focus:outline-none ${
						isMobileMenuOpen ? 'rounded-full bg-slate-200 text-slate-800' : 'text-slate-200'
					}`}
					onclick={handleMobileMenuToggle}
				>
					{#if isMobileMenuOpen}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="active:scale-110 active:text-slate-200 text-2xl focus:outline-none"
							width="1em"
							height="1em"
							viewBox="0 0 24 24"
							><path
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 12L7 7m5 5l5 5m-5-5l5-5m-5 5l-5 5"
							/></svg
						>
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="active:scale-110 active:text-red-500 text-2xl text-slate-800 focus:outline-none"
							width="1em"
							height="1em"
							viewBox="0 0 24 24"
							><path
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							/></svg
						>
					{/if}
				</button>
			</div>
		</div>
	</nav>
	{#if isMobileMenuOpen}
		<div
			class="main-nav-menu fixed inset-0 z-50 transform overflow-auto bg-transparent transition duration-150 lg:hidden"
			on:click={handleMobileMenuClose}
		>
			<div
				class="main-nav-menu-mobile z-50 w-[270px] border-r border-dashed border-slate-400/30 bg-white/70 shadow-sm backdrop-blur-lg md:w-[300px] lg:flex lg:w-[300px] lg:flex-col absolute left-0 top-0 bottom-0 right-0 lg:shadow-none"
				on:click|stopPropagation
			>
				<button>
					<div class="header-logo flex items-center space-x-2 p-5">
						<h2 class="text-2xl font-bold text-black">Incln</h2>
					</div>
				</button>
				<div class="header-menu lg:hidden">
					<ul class="flex-col space-y-5 px-8 py-5 pb-8 text-sm font-semibold text-zinc-700/60">
						{#each menuItems as menuItem}
							<li
								class="w-fit border-b border-transparent transition-colors duration-100 ease-linear hover:border-zinc-900/90 hover:text-zinc-900/90"
							>
								<a href={menuItem.url} on:click={handleMobileMenuClose}>
									<button>{menuItem.text}</button>
								</a>
							</li>
						{/each}
					</ul>
					<div class="header-button space-y-2">
						<div class="px-6 lg:flex lg:items-center">
							<a
								href="#pricing"
								class="flex w-full items-center justify-center rounded-full border border-black px-6 py-2.5 font-semibold text-black transition hover:shadow-lg hover:drop-shadow"
								on:click={handleMobileMenuClose}
							>
								<span>Join now</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>