<script>
	import '../app.pcss';
	import Header from './Header.svelte';
</script>

<div class="app h-screen flex flex-col justify-stretch">
	<Header />
	<main class="p-5 h-full overflow-auto">
		<slot />
	</main>
</div>
