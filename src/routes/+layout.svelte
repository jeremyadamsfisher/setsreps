<script>
	import '../app.pcss';
	import Header from './Header.svelte';
</script>

<div class="app h-screen flex flex-col justify-stretch">
	<Header />
	<main class="p-1 pt-5 sm:p-5 h-full overflow-auto">
		<slot />
	</main>
</div>
