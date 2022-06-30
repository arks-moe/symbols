<script>
	import supabase from '$lib/supabase-client';
	import { onMount } from 'svelte';
	import SymbolArtCard from '$components/SymbolArtCard.svelte';

	onMount(async () => {
		const { body, error } = await supabase.rpc('posts_meta', { page: 0 });
		if (error) console.error(error);
		const bodyParsed = body.map(e => {
			e.thumbnail = supabase.storage.from('symbols').getPublicUrl(e.thumbnail_filename).publicURL;
			return e;
		});
		posts = bodyParsed;
	});

	/** @type {import('$lib/types').Post[]} */
	let posts = [];
	$: console.log(posts);
</script>

<div class="max-w-7xl mx-auto ">
	<ul class="grid lg:grid-cols-2 gap-4 p-4">
		{#each posts as post}
			<SymbolArtCard {post} />
		{/each}
	</ul>
</div>
