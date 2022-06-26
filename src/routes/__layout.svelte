<script>
	import '../app.css';
	import Header from '$components/Header.svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';
</script>

<SvelteToast
	options={{
		duration: 2000
	}}
/>

<div class="bg-base-300 min-h-screen">
	<Header />
	<slot />
</div>
