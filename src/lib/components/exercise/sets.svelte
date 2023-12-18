<script lang="ts">
	import StatusSelect from './status-select.svelte';
	import * as Table from '$lib/components/ui/table';
	import { collectionStore } from 'sveltefire';
	import { db } from '$lib/firebase';
	import { collection } from 'firebase/firestore';
	import { Input } from '$lib/components/ui/input';
	import { setDoc, doc } from 'firebase/firestore';
	import { TrashIcon } from 'svelte-feather-icons';
	import { Button } from '$lib/components/ui/button';

	const sessionId = 'tIwtAZxRgO0GSVfPQHAw';
	const exerciseId = 'CNi8DSuCrUiKYMqUuApO';

	const setCollection = collection(db, 'session', sessionId, 'exercises', exerciseId, 'set');
	const sets = collectionStore(db, setCollection);

	function updateFactory(field: string) {
		return (value: string | null, setID: string) => {
			if (!value) return;
			const set = doc(db, 'session', sessionId, 'exercises', exerciseId, 'set', setID);
			setDoc(set, { [field]: value }, { merge: true });
		};
	}

	const updateWeight = updateFactory('weight');
	const updateReps = updateFactory('reps');
</script>

<div class="rounded-md border">
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head>Weight</Table.Head>
				<Table.Head>Reps</Table.Head>
				<Table.Head>Status</Table.Head>
				<Table.Head>Actions</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each $sets as row}
				<Table.Row>
					<Table.Cell>
						<Input
							type="text"
							value={row.weight}
							on:keyup={(e) => {
								//@ts-ignore
								updateWeight(e.target.value, row.id);
							}}
						/>
					</Table.Cell>
					<Table.Cell>
						<Input
							type="text"
							value={row.reps}
							on:keyup={(e) => {
								//@ts-ignore
								updateReps(e.target.value, row.id);
							}}
						/>
					</Table.Cell>
					<Table.Cell>
						<StatusSelect />
					</Table.Cell>
					<Table.Cell>
						<Button variant="ghost">
							<TrashIcon size="18" />
						</Button>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
