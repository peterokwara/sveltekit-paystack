<script lang="ts">
	let { enabled = $bindable() } = $props();
</script>

<div>
	<div class="flex items-center">
		<span class={`font-bold mr-2 ${enabled ? 'text-gray-500/60' : ''}`}> Monthly </span>
		<button
			onclick={() => (enabled = !enabled)}
			class={`${
				enabled ? 'bg-[#2355A0]' : 'bg-gray-200'
			} relative inline-flex h-6 w-11 items-center rounded-full`}
			aria-label="Toggle pricing"
		>
			<span
				class={`${
					enabled ? 'translate-x-6' : 'translate-x-1'
				} inline-block h-4 w-4 transform rounded-full bg-white transition`}
			></span>
		</button>
		<span class={`font-bold ml-2 ${enabled ? '' : 'text-gray-500/60'}`}> Yearly </span>
	</div>
</div>
