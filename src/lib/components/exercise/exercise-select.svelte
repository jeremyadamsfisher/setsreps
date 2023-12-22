<script lang="ts">
	import { Check, ChevronsUpDown } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';
	import { docStore } from 'sveltefire';
	import { cn } from '$lib/utils';
	import { tick } from 'svelte';
	import { db } from '$lib/firebase';
	import { doc, setDoc } from 'firebase/firestore';

	const sessionId = 'tIwtAZxRgO0GSVfPQHAw';
	const exerciseId = 'CNi8DSuCrUiKYMqUuApO';

	let docRef = doc(db, 'session', sessionId, 'exercises', exerciseId);
	let exerciseDoc = docStore(db, docRef);

	const options = [
		{
			name: 'Squat',
			variations: [
				'Barbell Squat',
				'Dumbbell Squat',
				'Front Squat',
				'Box Squat',
				'Hack Squat',
				'Goblet Squat',
				'Sumo Squat',
				'Pistol Squat'
			]
		},
		{
			name: 'Deadlift',
			variations: [
				'Conventional Deadlift',
				'Romanian Deadlift',
				'Sumo Deadlift',
				'Trap Bar Deadlift',
				'Rack Pull',
				'Stiff-Legged Deadlift'
			]
		},
		{
			name: 'Bench Press',
			variations: [
				'Barbell Bench Press',
				'Dumbbell Bench Press',
				'Incline Bench Press',
				'Decline Bench Press',
				'Close-Grip Bench Press',
				'Floor Press'
			]
		},
		{
			name: 'Overhead Press',
			variations: [
				'Barbell Overhead Press',
				'Dumbbell Overhead Press',
				'Seated Overhead Press',
				'Arnold Press',
				'Push Press',
				'Military Press'
			]
		},
		{
			name: 'Row',
			variations: [
				'Barbell Row',
				'Dumbbell Row',
				'Seated Cable Row',
				'T-Bar Row',
				'Inverted Row',
				'Face Pull'
			]
		},
		{
			name: 'Pull-Up',
			variations: [
				'Assisted Pull-Up',
				'Negative Pull-Up',
				'Chin-Up',
				'Wide-Grip Pull-Up',
				'Neutral-Grip Pull-Up',
				'Archer Pull-Up'
			]
		},
		{
			name: 'Push-Up',
			variations: [
				'Incline Push-Up',
				'Decline Push-Up',
				'Diamond Push-Up',
				'Wide-Grip Push-Up',
				'Narrow-Grip Push-Up',
				'Pike Push-Up'
			]
		},
		{
			name: 'Lunge',
			variations: [
				'Walking Lunge',
				'Reverse Lunge',
				'Box Lunge',
				'Weighted Lunge',
				'Bulgarian Split Squat',
				'Step-Up'
			]
		},
		{
			name: 'Dips',
			variations: ['Parallel Bar Dips', 'Weighted Dips', 'Triceps Dips', 'Box Dips', 'Machine Dips']
		},
		{
			name: 'Bicep Curl',
			variations: [
				'Barbell Bicep Curl',
				'Dumbbell Bicep Curl',
				'Hammer Curl',
				'Concentration Curl',
				'Preacher Curl',
				'Spider Curl'
			]
		}
	];

	const exercises = options.reduce((acc, curr) => [...acc, ...curr.variations], []);

	let open = false;
	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}

	function updateExerciseType(exerciseType: string) {
		setDoc(docRef, { type: exerciseType }, { merge: true });
	}
</script>

<Popover.Root bind:open let:ids>
	<Popover.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			variant="outline"
			role="combobox"
			aria-expanded={open}
			class="w-full justify-between"
		>
			{$exerciseDoc?.type || 'Select exercise'}
			<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-[300px] p-0">
		<Command.Root>
			<Command.Input placeholder="Search exercises..." />
			<Command.Empty>No exercise found.</Command.Empty>
			<Command.Group>
				{#each exercises.slice(0) as exercise}
					<Command.Item
						value={exercise}
						onSelect={(currentValue) => {
							updateExerciseType(currentValue);
							closeAndFocusTrigger(ids.trigger);
						}}
					>
						<Check
							class={cn('mr-2 h-4 w-4', $exerciseDoc?.type !== exercise && 'text-transparent')}
						/>
						{exercise}
					</Command.Item>
				{/each}
			</Command.Group>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
