<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { db } from '$lib/firebase';
	import { collection, doc } from 'firebase/firestore';
	import { addDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';

	const sessionId = 'tIwtAZxRgO0GSVfPQHAw';
	const exerciseId = 'CNi8DSuCrUiKYMqUuApO';

	let exerciseDoc = doc(db, 'session', sessionId, 'exercises', exerciseId);
	let setCollection = collection(db, 'session', sessionId, 'exercises', exerciseId, 'set');

	/**
	 * Add a new set to the exercise
	 */
	function addSet() {
		addDoc(setCollection, {
			weight: 0,
			reps: 0,
			status: 'Pending',
			created: serverTimestamp()
		});
	}

	/**
	 * Remove the exercise
	 */
	function removeExercise() {
		deleteDoc(exerciseDoc);
	}
</script>

<div class="flex-row gap-1">
	<Button variant="secondary" on:click={addSet}>Add Set</Button>
	<AlertDialog.Root>
		<AlertDialog.Trigger asChild let:builder>
			<Button builders={[builder]} variant="ghost" on:click={removeExercise}>Remove</Button>
		</AlertDialog.Trigger>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>Are you sure?</AlertDialog.Title>
				<AlertDialog.Description>This action cannot be undone.</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
				<AlertDialog.Action>Continue</AlertDialog.Action>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
</div>
