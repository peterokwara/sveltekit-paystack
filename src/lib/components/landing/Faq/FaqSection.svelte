<script>
	import FaqComponent from './FaqComponent.svelte';
	import faqImage from '$lib/assets/landing/faqimage.jpg';
</script>

<section class="faq__section max-w-5xl mx-auto py-10">
	<div class="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-x-10 gap-y-10">
		<div class="w-full md:w-max lg:w-1/3 bg-[#2355A0]/10 md:p-2 md:rounded-xl">
			<img class="md:rounded-lg" src={faqImage} alt="" />
		</div>
		<div class="w-full lg:w-2/3">
			<div class="faq-headline flex flex-col gap-y-2">
				<h3
					class="text-2xl md:text-3xl lg:text-4xl max-w-xs mx-auto md:max-w-full md:mx-0 text-center font-bold leading-[1.15] text-black"
				>
					Frequently asked questions
				</h3>
			</div>
			<!-- Actual faq component with accordion -->
			<div class="lg:mt-5">
				<FaqComponent />
			</div>
		</div>
	</div>
</section>
