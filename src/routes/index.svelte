<script context="module">
	/** @type import('./__types/index').Load */
	export async function load() {
		const { body: posts, error } = await supabaseClient.rpc('posts_meta', { page: 0 });
		if (error) console.error(error);
		return {
			props: { posts }
		};
	}
</script>

<script>
	import { supabaseClient } from '$lib/db';
	import SymbolArtCard from '$components/SymbolArtCard.svelte';
	import { postView } from '$stores/postView';

	/** @type {import('$lib/types').Post[]} */
	export let posts = [];
	$postView = posts;
</script>

<svelte:head>
	<title>Home | Symbol Bucket</title>
	<meta property="og:title" content="Symbol Bucket" />
	<meta property="og:image" content="https://symbols.arks.moe/default-embed.png" />
	<meta property="og:description" content="Upload and share your Symbol Arts!" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Symbol Bucket" />
	<meta property="twitter:description" content="Upload and share your Symbol Arts!" />
	<meta property="twitter:image" content="https://symbols.arks.moe/default-embed.png" />
</svelte:head>

<div class="max-w-5xl mx-auto p-2">
	<h2 class="font-bold text-3xl text-center py-2">Latest 20 Uploads</h2>
	<div class="mx-auto w-fit py-2"><a href="./catalog/1" class="btn">to Catalog</a></div>

	{#if $postView.length <= 0}
		<h3>Unable to find any posts</h3>
	{/if}
	<ul class="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 justify-center">
		{#each $postView as post (post.post_id)}
			<SymbolArtCard {post} />
		{/each}
	</ul>
</div>

<div class="mx-auto w-fit p-2"><a href="./catalog/1" class="btn">to Catalog</a></div>
