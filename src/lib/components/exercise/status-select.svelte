<script lang="ts">
	import * as Popover from '$lib/components/ui/popover';
	import { Button } from '$lib/components/ui/button';
	import { Check, ChevronsUpDown } from 'lucide-svelte';
	import { doc, setDoc } from 'firebase/firestore';
	import { db } from '$lib/firebase';
	import { deleteDoc } from 'firebase/firestore';
	import { docStore } from 'sveltefire';
	import { tick } from 'svelte';

	let statuses = ['Pending', 'Completed', 'Failed'];

	let sessionId = 'tIwtAZxRgO0GSVfPQHAw';
	let exerciseId = 'CNi8DSuCrUiKYMqUuApO';
	export let setId: string;

	let setDoc_ = doc(db, 'session', sessionId, 'exercises', exerciseId, 'set', setId);
	let exercise = docStore(db, setDoc_);

	function updateSetStatus(newStatus: string) {
		setDoc(setDoc_, { status: newStatus }, { merge: true });
	}

	function removeSet() {
		deleteDoc(setDoc_);
	}

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
</script>

<Popover.Root bind:open let:ids>
	<Popover.Trigger asChild let:builder>
		<Button builders={[builder]} variant="ghost" role="combobox" class="w-[120px]">
			{$exercise?.status || 'Pending'}
			<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
		</Button>
	</Popover.Trigger>
	<Popover.Content>
		<div class="flex flex-col gap-3">
			<div class="flex flex-col gap-1">
				{#each statuses as status (status)}
					<Button
						variant="ghost"
						on:click={() => {
							updateSetStatus(status);
							closeAndFocusTrigger(ids.trigger);
						}}
					>
						{#if status === $exercise?.status}
							<Check class="mr-2 h-4 w-4 shrink-0 opacity-50" />
						{/if}
						{status}
					</Button>
				{/each}
			</div>
			<Button on:click={removeSet}>Remove</Button>
		</div>
	</Popover.Content>
</Popover.Root>
