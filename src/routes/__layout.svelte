<script>
	import '../app.css';
	import Header from '$components/Header.svelte';
</script>

<div class="bg-base-300 min-h-screen">
	<Header />
	<slot />
</div>
