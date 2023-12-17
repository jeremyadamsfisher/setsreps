<script>
	import '../app.pcss';
	import Header from './Header.svelte';
</script>

<div class="app">
	<Header></Header>
	<main class="p-5">
		<slot />
	</main>
</div>
