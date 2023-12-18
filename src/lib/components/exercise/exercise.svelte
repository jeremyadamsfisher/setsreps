<script lang="ts">
	import ExerciseSelect from './exercise-select.svelte';
	import ActionBar from './action-bar.svelte';
	import Sets from './sets.svelte';
	import * as Card from '$lib/components/ui/card';
</script>

<Card.Root class="flex-1 sm:p-5 p-2 flex flex-col sm:gap-5 gap-2">
	<ExerciseSelect />
	<Sets />
	<ActionBar />
</Card.Root>
