<script>
	// @ts-nocheck
	import supabase from '$lib/supabase-client';
	import user from '$stores/userSession';
	import UserWidget from '$components/UserWidget.svelte';

	supabase.auth.onAuthStateChange((event, session) => {
		console.log('Auth State has Changed:', event, session);
		$user = supabase.auth.user();
	});
</script>

<UserWidget />
