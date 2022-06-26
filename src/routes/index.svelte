<script>
	// @ts-nocheck
	import supabase from '$lib/supabase-client';
	import user from '$stores/userSession';
	import bucketDownloadRename from '$lib/bucket-download-rename';
	import { toast } from '@zerodevx/svelte-toast';

	supabase.auth.onAuthStateChange((event, session) => {
		console.log('Auth State has Changed:', event, session);
		$user = supabase.auth.user();
	});
</script>

<button
	class="btn"
	on:click={() => {
		bucketDownloadRename('symbols', 'thumbnail-shrimp.png', 'bazingabruh.png');
	}}>Download but epic</button
>

<button
	on:click={() => {
		toast.push('bazinga', {
			theme: {
				'--toastBackground': '#F56565',
				'--toastBarBackground': '#C53030'
			}
		});
	}}
>
	push toast
</button>
