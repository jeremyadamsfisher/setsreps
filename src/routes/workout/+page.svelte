<script lang="ts">
	import Exercise from '../../lib/components/exercise/exercise.svelte';
	import TimerBar from '../../lib/components/timer-bar/timer-bar.svelte';
	import NewExerciseButton from '../../lib/components/new-exercise-button.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { goto } from "$app/navigation";
	import { page } from "$app/stores"; 

	// While this actually does return a null, if it is then the page will reload
	// and the new session id will be set as a string.
	let sessionId = $page.url.searchParams.get('sessionId')!;
	if (!sessionId) {
		sessionId = crypto.randomUUID().toString()
		const newUrl = new URL($page.url);
		newUrl?.searchParams?.set('sessionId', sessionId);
		goto(newUrl)
	}
</script>

<svelte:head>
	<title>Sets and Reps</title>
	<meta name="description" content="Sets and Reps" />
</svelte:head>

<div class="flex flex-col h-full justify-between">
	<div class="flex flex-wrap gap-5 align-stretch">
		<Exercise {sessionId} />
		<Exercise {sessionId} />
		<NewExerciseButton />
		<Button>Complete workout</Button>
	</div>
	<TimerBar />
</div>
