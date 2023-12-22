<script lang="ts">
	import StatusSelect from './status-select.svelte';
	import * as Table from '$lib/components/ui/table';
	import { collectionStore } from 'sveltefire';
	import { db } from '$lib/firebase';
	import { collection } from 'firebase/firestore';
	import { Input } from '$lib/components/ui/input';
	import { setDoc, doc, query, orderBy } from 'firebase/firestore';

	const sessionId = 'tIwtAZxRgO0GSVfPQHAw';
	const exerciseId = 'CNi8DSuCrUiKYMqUuApO';

	let setCollection = collection(db, 'session', sessionId, 'exercises', exerciseId, 'set');
	let sets = collectionStore(db, query(setCollection, orderBy('created')));

	/**
	 * Update a set's weight or reps
	 *
	 * @param setID The ID of the set to update
	 * @param field The field to update
	 * @param e The event
	 */
	function updateSet(setID: string, field: string, e: any) {
		const value = e.target?.value;
		if (!value) return;
		const set = doc(db, 'session', sessionId, 'exercises', exerciseId, 'set', setID);
		setDoc(set, { [field]: value }, { merge: true });
	}
</script>

<div class="rounded-md border">
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head>Weight</Table.Head>
				<Table.Head>Reps</Table.Head>
				<Table.Head>Status</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each $sets as row (row.id)}
				<!-- Table.Row is customized for animation -->
				<Table.Row>
					<Table.Cell>
						<Input
							type="number"
							value={row.weight}
							on:input={(e) => updateSet(row.id, 'weight', e)}
						/>
					</Table.Cell>
					<Table.Cell>
						<Input type="number" value={row.reps} on:input={(e) => updateSet(row.id, 'reps', e)} />
					</Table.Cell>
					<Table.Cell>
						<StatusSelect setId={row.id} />
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
