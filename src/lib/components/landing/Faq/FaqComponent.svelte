<script lang="ts">
	import FaqData from './FaqData';
	let open: boolean[] = $state([]);

	$effect(() => {
		open = FaqData.map(() => false);
	});

	function toggle(index: number) {
		open[index] = !open[index];
	}
</script>

<div class="w-full px-7 md:px-10 xl:px-2 py-5">
	<div class="mx-auto w-full max-w-5xl rounded-lg bg-white">
		{#each FaqData as faq, index (faq.question)}
			<div>
				<div
					class={`${
						index !== FaqData.length + 1
							? 'border border-[#0A071B]/10 py-1.5 px-3 rounded-lg mb-2'
							: ''
					}`}
				>
					<button
						class="py-2.5 flex w-full items-start gap-x-5 justify-between rounded-lg text-left text-lg font-bold text-slate-800 focus:outline-none"
						onclick={() => toggle(index)}
					>
						<span>{faq.question}</span>
						<svg
							xmlns="http://www.w.org/2000/svg"
							class={` mt-1.5 md:mt-0 flex-shrink-0 ${
								open[index] ? 'rotate-180 transform' : ''
							} h-5 w-5 text-[#5B5675]`}
							width="1em"
							height="1em"
							viewBox="0 0 24 24"
							><path
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="m6 9l6 6l6-6"
							/></svg
						>
					</button>
					{#if open[index]}
						<div class="pt-2 pb-2 pr-5 text-sm lg:text-base text-[#343E3A] font-medium">
							{faq.answer}
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>
