<script>
	// @ts-nocheck
	import supabase from '$lib/supabase-client';
	import user from '$stores/userSession';
	import UserWidget from '$components/UserWidget.svelte';
	import bucketDownloadRename from '$lib/bucket-download-rename';

	supabase.auth.onAuthStateChange((event, session) => {
		console.log('Auth State has Changed:', event, session);
		$user = supabase.auth.user();
	});
</script>

<UserWidget />

<button
	class="btn"
	on:click={() => {
		bucketDownloadRename('symbols', 'thumbnail-shrimp.png', 'bazingabruh.png');
	}}>Download but epic</button
>
