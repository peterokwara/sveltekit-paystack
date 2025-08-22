<script>
	import benefitsvg1 from '$lib/assets/landing/first-benefit-image.jpg';
	import benefitsvg2 from '$lib/assets/landing/second-benefit-image.jpg';
</script>

<section class="benefit__section py-10 lg:py-24 px-10 lg:px-14">
	<div class="total-benefit-container flex flex-col gap-y-10 max-w-5xl mx-auto">
		<!--first Benefit Section -->
		<div
			class="first-benefit-section flex flex-col-reverse gap-y-10 lg:flex-row items-center justify-between gap-x-10"
		>
			<div
				class="left-text leading-[1.25] lg:w-1/2 flex flex-col items-center justify-center gap-y-5 max-w-lg lg:max-w-full"
			>
				<h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-center lg:text-left text-[#0A071B]">
					Manage your sales from anywhere around the globe
				</h2>
				<p class="text-sm md:text-base text-center lg:text-left font-medium pr-2 text-[#5B5675]">
					Suitable for those who don't have time to to manage their sales, this is where we come in
					handy for you
				</p>
				<div class="w-full">
					<a
						href="/"
						class="flex w-full lg:w-fit items-center text-white justify-center rounded-lg bg-[#2355A0] px-6 py-2.5 font-semibold hover:shadow-lg hover:drop-shadow transition duration-200"
					>
						<span>Learn more</span>
					</a>
				</div>
			</div>
			<div class="right-image w-full lg:w-1/2">
				<div class=" rounded-2xl image-container relative isolate">
					<img class="w-full md:w-2/3 lg:w-full mx-auto" src={benefitsvg1} alt="" />
				</div>
			</div>
		</div>
		<!-- Second Benefit Section -->
		<div
			class="second-benefit-section flex flex-col gap-y-10 lg:flex-row items-center justify-between gap-x-0 lg:gap-x-20"
		>
			<div class="left-image w-full lg:w-1/2 ">
				<div class=" rounded-2xl image-container relative isolate">
					<img class="w-full md:w-2/3 lg:w-full mx-auto" src={benefitsvg2} alt="" />
				</div>
			</div>
			<div
				class="right-text leading-[1.25] lg:w-1/2 flex flex-col gap-y-5 max-w-lg lg:max-w-full"
			>
				<h2 class="text-2xl md:text-4xl font-bold text-[#0A071B] text-center lg:text-left">
					Collaborate with bigger & better merchants
				</h2>
				<p class="text-sm md:text-base font-medium pr-0 lg:pr-2 text-[#5B5675] text-center lg:text-left">
					Can collaborate with other traders to discuss progress in the field of marketing & sales
				</p>
				<div class="flex gap-x-5">
					<a
						href="/"
						class="flex w-full lg:w-fit items-center text-white justify-center rounded-lg bg-[#2355A0] px-6 py-2.5 font-semibold hover:shadow-lg hover:drop-shadow transition duration-200"
					>
						<span>Get started</span>
					</a>
					<a
						href="/"
						class="flex w-full lg:w-fit items-center text-black justify-center rounded-lg border border-[#6A65FF] px-6 py-2.5 font-semibold hover:shadow-lg hover:drop-shadow transition duration-200"
					>
						<span>Learn more</span>
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
