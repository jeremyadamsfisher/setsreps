<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';
	import { slide } from 'svelte/transition';

	type $$Props = HTMLAttributes<HTMLTableRowElement> & {
		'data-state'?: unknown;
	};

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<tr
	transition:slide={{ duration: 150 }}
	class={cn(
		'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
		// `display: block` necessary for transition: https://github.com/sveltejs/svelte/issues/4948
		'block',
		className
	)}
	{...$$restProps}
	on:click
	on:keydown
>
	<slot />
</tr>
