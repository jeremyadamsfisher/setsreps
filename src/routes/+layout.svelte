<script lang="ts">
	import '../app.pcss';
	import './styles.css';
	import { auth } from '$lib/firebase';
	import { userStore } from 'sveltefire';
	import Header from './Header.svelte';
	import LogIn from '$lib/components/log-in/log-in.svelte';

	const user = userStore(auth);
</script>

<div class="app h-screen flex flex-col justify-stretch">
	<Header />
	<main class="p-1 pt-5 sm:p-5 h-full overflow-auto">
		{#if $user}
			<slot />
		{:else}
			<LogIn />
		{/if}
	</main>
</div>
