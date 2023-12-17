<script lang="ts">
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
		<nav class="flex items-center space-x-6 text-sm font-medium">
			{#each links as link}
				<a href={link.href} class="transition-colors hover:text-foreground/80 text-foreground/60">
					{link.label}
				</a>
			{/each}
		</nav>
	</div>
</header>
