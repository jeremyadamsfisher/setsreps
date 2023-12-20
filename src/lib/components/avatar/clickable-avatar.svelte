<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { LogOutIcon } from 'svelte-feather-icons';
	import { auth } from '$lib/firebase';
	import { userStore } from 'sveltefire';

	const user = userStore(auth);
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Avatar.Root>
			<Avatar.Image src={$user?.photoURL} alt="user profile" />
			<Avatar.Fallback>{$user?.displayName}</Avatar.Fallback>
		</Avatar.Root>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56">
		<DropdownMenu.Label>My Account ({$user?.displayName})</DropdownMenu.Label>
		<DropdownMenu.Group>
			<DropdownMenu.Item class="flex gap-2" on:click={() => auth.signOut()}>
				<LogOutIcon size="18" />
				<span>Log out</span>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
