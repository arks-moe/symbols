<script>
	import supabase from '$lib/supabase-client';
	import user from '$stores/userSession';

	import '../app.css';
	import Header from '$components/Header.svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { onMount } from 'svelte';

	supabase.auth.onAuthStateChange((event, session) => {
		console.log('Auth State has Changed:', event, session);
		$user = supabase.auth.user();
	});

	onMount(() => {
		$user = supabase.auth.user();
	});
</script>

<SvelteToast
	options={{
		duration: 2000,
		reversed: true,
		intro: { y: 192 }
	}}
/>

<div class="bg-base-300 min-h-screen">
	<Header />
	<slot />
</div>

<style>
	:root {
		--toastContainerTop: auto;
		--toastContainerRight: auto;
		--toastContainerBottom: 1rem;
		--toastContainerLeft: calc(50vw - 8rem);
	}
</style>
