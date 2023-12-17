<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	export let onStart: (timerAmount: number) => void;

	const timerAmountOptions = [
		{
			label: '30 seconds',
			value: 30
		},
		{
			label: '1 minute',
			value: 60
		},
		{
			label: '2 minutes',
			value: 120
		}
	];
</script>

{#each timerAmountOptions as timerAmountOption}
	<Button
		variant="outline"
		class="flex sm:flex-none flex-1 gap-2"
		on:click={() => onStart(timerAmountOption.value)}
	>
		{timerAmountOption.label}
	</Button>
{/each}
