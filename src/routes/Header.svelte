<script lang="ts">
	import ClickableAvatar from '$lib/components/avatar/clickable-avatar.svelte';
	import { MenuIcon } from 'svelte-feather-icons';
	import { auth } from '$lib/firebase';
	import { userStore } from 'sveltefire';

	const user = userStore(auth);

	const links = [
		{
			label: 'Workout',
			href: '/workout'
		},
		{
			label: 'History',
			href: '/history'
		}
	];
</script>

<header
	class="supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 shadow-sm backdrop-blur"
>
	<div class="container flex h-14 items-center">
		<div class="mr-4 flex">
			<a href="/" class="mr-6 flex items-center space-x-2">
				<span class="font-bold inline-block text-[15px] lg:text-base"> 🏋️ Sets & Reps </span>
			</a>
		</div>
		{#if $user}
			<nav class="hidden sm:flex items-center space-x-6 text-sm font-medium">
				{#each links as link}
					<a href={link.href} class="transition-colors hover:text-foreground/80 text-foreground/60">
						{link.label}
					</a>
				{/each}
			</nav>
			<div class="flex flex-1 items-center space-x-2 sm:space-x-4 justify-end">
				<nav class="items-center gap-5 flex">
					<div class="hidden sm:flex items-center gap-5">
						<a href="https://www.buymeacoffee.com/jeremyfisher" target="_blank"
							><img
								src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
								alt="Buy Me A Coffee"
								style="height: 35px !important;width: 135px !important;"
							/></a
						>
						<ClickableAvatar />
					</div>
					<div class="flex sm:hidden">
						<MenuIcon size="18" />
					</div>
				</nav>
			</div>
		{/if}
	</div>
</header>
