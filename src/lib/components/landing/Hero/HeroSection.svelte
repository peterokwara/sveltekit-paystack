<script>
	import Navbar from '$lib/components/landing/Navbar.svelte';
	import heroImage1 from '$lib/assets/landing/heroImage-1.svg';
	import heroImage2 from '$lib/assets/landing/heroImage-2.svg';
	import heroImage3 from '$lib/assets/landing/heroImage-3.svg';
</script>

<section class="hero__section">
	<Navbar />
	<div
		class="hero__container px-7 lg:px-10 max-w-6xl mx-auto flex flex-col gap-y-10 lg:flex-row items-center gap-x-10 justify-center py-10 lg:py-24"
	>
		<div class="hero-content lg:w-[650px] lg:px-5 flex flex-col gap-y-5">
			<h1
				class="text-3xl md:text-4xl lg:text-5xl leading-[1.2] md:max-w-xl md:mx-auto text-center lg:max-w-full font-semibold text-black"
			>
				Manage your products in a more organised way
			</h1>
			<p class="text-base md:max-w-xl md:mx-auto lg:mx-0 lg:max-w-full text-center">
				Dive is where teams come together for effective meetings that build collaboration, foster
				accountability, and move projects forward.
			</p>
		</div>
	</div>

	<div
		class="bg-[#E9EEF6] flex items-center justify-center gap-5 p-10 max-w-6xl mx-auto rounded-none lg:rounded-2xl overflow-hidden"
	>
		<img src={heroImage1} alt="" />
		<img src={heroImage2} alt="" />
		<img src={heroImage3} alt="" />
	</div>
</section>
