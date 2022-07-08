<script>
	import supabase from '$lib/supabase-client';
	import { onMount } from 'svelte';
	import SymbolArtCard from '$components/SymbolArtCard.svelte';

	onMount(async () => {
		const { body, error } = await supabase.rpc('posts_meta', { page: 0 });
		if (error) console.error(error);
		posts = body;
	});

	/** @type {import('$lib/types').Post[]} */
	let posts = [];
	$: console.log(posts);
</script>

<div class="max-w-5xl mx-auto p-2">
	<h2 class="font-bold text-3xl text-center p-8">Latest 20 Uploads</h2>
	<ul class="grid sm:grid-cols-2 gap-4 p-4 justify-center">
		{#each posts as post}
			<SymbolArtCard {post} />
		{/each}
	</ul>
</div>

<div class="mx-auto w-fit py-16"><a href="./catalog/1" class="btn">to Catalog</a></div>
