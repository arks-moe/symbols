<script>
	import supabase from '$lib/supabase-client';

	import { onMount } from 'svelte';

	onMount(async () => {
		const { body, error } = await supabase.rpc('posts_meta');
		if (error) console.error(error);
		console.log(body);
	});
</script>
