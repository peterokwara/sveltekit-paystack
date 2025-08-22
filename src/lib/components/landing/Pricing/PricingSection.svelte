<script>
	import Pricingtoggle from './Pricingtoggle.svelte';

	let enabled = $state(false);

	const pricingOptions = [
		{
			name: 'Free',
			price: '299',
			yearlyPrice: '529',
			planId: 'free',
			description:
				'Let top creative talent come to you by posting your job listing on #1 Design Jobs Board.',
			features: [
				'Access to All Features',
				'20% discount on backorders',
				'Domain name Appraisal',
				'10 Social Profiles'
			],
			backgroundColor: '#FFFFFF',
			buttonColor: 'bg-[#295D4E]/10',
			buttonTextColor: 'text-black',
			tagColor: 'bg-gray-200',
			tagTextColor: 'text-black'
		},

		{
			name: 'Pro',
			price: '499',
			yearlyPrice: '1228',
			planId: 'pro',
			description:
				"Get your roles filled faster with unlimited access to Dribbble's Job Board and Designer search.",
			features: [
				'Access to All Features',
				'20% discount on backorders',
				'Domain name Appraisal',
				'10 Social Profiles'
			],
			extraBenefits: 'Everything in free plan, plus',
			backgroundColor: '#DEE9EA',
			buttonColor: 'bg-[#295D4E]',
			buttonTextColor: 'text-white',
			tagColor: 'bg-gray-200',
			tagTextColor: 'text-black'
		}
	];
</script>

<section class="pricing__section max-w-5xl mx-auto py-10">
	<div class="pricing-headline flex flex-col gap-y-2">
		<div class="flex items-center justify-center flex-col gap-y-3">
			<h3
				class="text-3xl sm:text-4xl max-w-xs mx-auto md:max-w-full md:mx-0 text-center font-bold leading-[1.15] text-black"
			>
				Ready to start with us?
			</h3>
			<p class="text-sm text-slate-700/70">Choose the best package that suits you</p>
		</div>
		<div class="flex justify-center mt-8">
			<Pricingtoggle bind:enabled={enabled} />
		</div>
		<div
			class="pricing-card max-w-3xl mx-auto w-full grid place-content-center items-center lg:items-start h-full px-10 lg:px-14 xl:px-2 gap-6 py-8 lg:py-12 lg:pb-20 lg:pt-8"
		>
			{#each pricingOptions as option}
				<div
					class={`w-fit lg:w-full h-full border border-[#d4d4d440] rounded-xl grid lg:grid-cols-5 place-content-center `}
				>
					<div
						class="p-5 flex flex-col justify-between gap-y-2 col-span-2 bg-[#E9EEF6] rounded-t-xl lg:rounded-t-none lg:rounded-tl-xl lg:rounded-bl-xl"
					>
						<div>
							<p class={` text-2xl text-[#2355A0] font-semibold`}>
								{option.name}
							</p>
							<p class="text-zinc-500 text-xs font-medium max-w-md mx-0">
								{option.description}
							</p>
						</div>
						<div>
							<h3 class="mt-5 text-sm font-medium text-slate-500/70">
								<span class="text-3xl font-[620] text-slate-800">
									{enabled ? option.yearlyPrice : option.price}
									<span class="text-zinc-500 text-sm font-medium">
										{enabled ? '/year' : '/month'}
									</span>
								</span>
							</h3>
							<a
								href={`/checkout?plan=${option.planId}&price=${enabled ? option.yearlyPrice : option.price}&yearly=${enabled}`}
								class={`my-2 flex text-base items-center justify-center rounded-lg h-10 w-full font-bold  border border-slate-500 hover:shadow-lg hover:drop-shadow-lg transition duration-200 bg-[#2355A0] text-white `}
							>
								<span class="tracking-tight" style="color: {option.buttonTextColor}">
									Choose Plan
								</span>

								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="ml-2"
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
							</a>
						</div>
					</div>

					<div class="pricing-features flex flex-col justify-center col-span-3 gap-y-5 p-5 lg:w-2/3">
						{#if option.extraBenefits}
							<p class="text-[#7D7D82] text-sm font-[400]">
								{option.extraBenefits}
							</p>
						{/if}
						{#each option.features as feature}
							<div class="flex gap-x-3">
								<div class="bg-[#2355A0] rounded-full">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="text-white text-xl"
										width="1em"
										height="1em"
										viewBox="0 0 24 24"
										><path
											fill="none"
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M5 13l4 4L19 7"
										/></svg
									>
								</div>
								<p class="text-[#486581] text-sm">{feature}</p>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
