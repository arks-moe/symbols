<script>
	import supabase from '$lib/supabase-client';
	import user from '$stores/userSession';

	import '../app.css';
	import Header from '$components/Header.svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';

	supabase.auth.onAuthStateChange((event, session) => {
		console.log('Auth State has Changed:', event, session);
		$user = supabase.auth.user();
	});
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
