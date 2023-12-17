<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Select from '$lib/components/ui/select';
	import * as Table from '$lib/components/ui/table';
	import { collectionStore } from 'sveltefire';
	import { db } from '$lib/firebase';
	import { collection } from 'firebase/firestore';

	const sessionId = 'tIwtAZxRgO0GSVfPQHAw';
	const exerciseId = 'CNi8DSuCrUiKYMqUuApO';

	const setCollection = collection(db, 'session', sessionId, 'exercises', exerciseId, 'set');
	const sets = collectionStore(db, setCollection);
</script>

<div class="rounded-md border">
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head>#</Table.Head>
				<Table.Head>Weight</Table.Head>
				<Table.Head>Reps</Table.Head>
				<Table.Head>Status</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each $sets as row}
				<Table.Row>
					<Table.Cell>{row.order}</Table.Cell>
					<Table.Cell>{row.weight}</Table.Cell>
					<Table.Cell>{row.reps}</Table.Cell>
					<Table.Cell>
						<Button variant="secondary">Done</Button>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
