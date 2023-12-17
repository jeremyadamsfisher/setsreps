<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Progress } from '$lib/components/ui/progress';
	import { StopCircleIcon } from 'svelte-feather-icons';
	import StartTimer from './start-timer.svelte';

	let timerOn = false;
	let progress = 0;
	let intervalRef: any;

	function onStart(timerAmount: number) {
		progress = 0;
		timerOn = true;
		const startTime = Date.now();
		clearInterval(intervalRef);
		intervalRef = setInterval(() => {
			const now = Date.now();
			const timeElapsed = now - startTime;
			progress = (timeElapsed / (timerAmount * 1000)) * 100;
			if (progress >= 100) {
				clearInterval(intervalRef);
				progress = 0;
				timerOn = false;
			}
		}, 100);
	}

	function onStop() {
		timerOn = false;
		progress = 0;
		clearInterval(intervalRef);
	}
</script>

<div class="flex items-center w-full gap-5">
	<Progress value={progress} max={100} class="flex-1" />
	<div class="flex gap-1">
		{#if timerOn}
			<Button variant="outline" class="flex sm:flex-none flex-1 gap-2" on:click={onStop}>
				<StopCircleIcon size="14" />Stop
			</Button>
		{:else}
			<StartTimer {onStart} />
		{/if}
	</div>
</div>
