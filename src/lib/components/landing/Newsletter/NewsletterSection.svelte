<script>
	import newsletterImage from '$lib/assets/landing/newslettersvg.svg';
</script>

<section class="cta__section max-w-5xl mx-auto py-14 px-5 lg:px-0">
	<div
		class=" bg-[#2355A0] p-10 rounded-2xl
       mx-auto flex flex-col gap-y-5 justify-center items-center relative"
	>
		<div class="absolute right-0 top-10 overflow-hidden">
			<img src={newsletterImage} alt="" />
		</div>
		<h3 class="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center">
			Join our beta program for more features
		</h3>
		<div
			class="input-form max-w-2xl mx-auto w-full flex flex-col md:flex-row gap-y-2 items-center justify-center lg:justify-start gap-x-5 lg:gap-x-5 mt-5"
		>
			<div class="w-full">
				<input
					type="text"
					placeholder="Enter your email address"
					class="py-2.5 px-5 placeholder:text-sm rounded-lg bg-white/20 border border-zinc-400/40 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ring-offset-2 ring-offset-white transition duration-200"
				/>
			</div>
			<button
				class="bg-white w-full md:w-1/3 hover:shadow-md focus:ring-2 focus:ring-indigo-500/50 ring-offset-2 ring-offset-[#EAE8FF] hover:drop-shadow transition duration-200 lg:w-1/3 text-zinc-800 text-sm rounded-lg px-5 py-2.5 shadow-md group font-clash font-[500]"
			>
				Send an Email
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="inline-block ml-2"
					width="1em"
					height="1em"
					viewBox="0 0 24 24"
					><path
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M5 12h14m-7-7l7 7l-7 7"
					/></svg
				>
			</button>
		</div>
	</div>
</section>
