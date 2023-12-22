<script lang="ts">
	import Exercise from '../lib/components/exercise/exercise.svelte';
	import TimerBar from '../lib/components/timer-bar/timer-bar.svelte';
	import NewExerciseButton from '../lib/components/new-exercise-button.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<svelte:head>
	<title>Sets and Reps</title>
	<meta name="description" content="Sets and Reps" />
</svelte:head>

<div class="flex flex-col h-full justify-between">
	<div class="flex flex-wrap gap-5 align-stretch">
		<Exercise />
		<Exercise />
		<NewExerciseButton />
		<Button>Complete workout</Button>
	</div>
	<TimerBar />
</div>
