<script lang="ts">
	import '../app.pcss';
	import './styles.css';
	import { auth } from '$lib/firebase';
	import { userStore } from 'sveltefire';
	import Header from './Header.svelte';
	import LogIn from '$lib/components/log-in/log-in.svelte';
	import {Circle} from "svelte-loading-spinners";

	const user = userStore(auth);
</script>

<div class="app h-screen flex flex-col justify-stretch">
	<Header />
	<main class="p-3 pt-5 sm:p-5 h-full overflow-auto">
		{#if $user}
			<slot />
		{:else if $user === null}
			<div class="h-full flex justify-center items-center">
				<Circle color="white" size={30}  />
			</div>
		{:else}
			<LogIn />
		{/if}
	</main>
</div>
