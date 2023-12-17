<script lang="ts">
	import ExerciseSelect from './exercise-select.svelte';
	import ActionBar from './action-bar.svelte';
	import Sets from './sets.svelte';
	import * as Card from '$lib/components/ui/card';
</script>

<Card.Root class="flex-1 p-5 flex flex-col gap-5">
	<ExerciseSelect />
	<Sets />
	<ActionBar />
</Card.Root>
