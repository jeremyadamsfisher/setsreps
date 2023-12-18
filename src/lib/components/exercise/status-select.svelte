<script lang="ts">
	import * as Select from '$lib/components/ui/select';

	const statuses = [
		{ value: 'pending', label: 'Pending' },
		{ value: 'completed', label: 'Completed' },
		{ value: 'failed', label: 'Failed' },
		{ value: 'remove', label: 'Remove' }
	];

	function onClick(newStatus: string) {
		console.log('clicked');
	}
</script>

<Select.Root portal={null}>
	<Select.Trigger class="w-[120px]">
		<Select.Value placeholder="Pending" />
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			{#each statuses as status}
				<Select.Item
					value={status.value}
					label={status.label}
					on:click={() => onClick(status.value)}
				>
					{status.label}
				</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
	<Select.Input name="setStatus" />
</Select.Root>
