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

	const exercises = ['Bench Press', 'Overhead Press'];

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
				{#each exercises as exercise}
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
