<script context="module">
	/** @type import('./__types/index').Load */
	export async function load() {
		const { body: posts, error } = await supabase.rpc('posts_meta', { page: 0 });
		if (error) console.error(error);
		return {
			props: { posts }
		};
	}
</script>

<script>
	import supabase from '$lib/supabase-client';
	import SymbolArtCard from '$components/SymbolArtCard.svelte';

	/** @type {import('$lib/types').Post[]} */
	export let posts = [];
</script>

<div class="max-w-5xl mx-auto p-2">
	<h2 class="font-bold text-3xl text-center p-8">Latest 20 Uploads</h2>
	{#if posts.length <= 0}
		<h3>Unable to find any posts</h3>
	{/if}
	<ul class="grid sm:grid-cols-2 gap-4 p-4 justify-center">
		{#each posts as post}
			<SymbolArtCard {post} />
		{/each}
	</ul>
</div>

<div class="mx-auto w-fit py-16"><a href="./catalog/1" class="btn">to Catalog</a></div>
