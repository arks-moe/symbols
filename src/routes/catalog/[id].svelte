<script>
	import supabase from '$lib/supabase-client';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import SymbolArtCard from '$components/SymbolArtCard.svelte';

	let id = $page.params.id;
	$: id = $page.params.id;

	onMount(async () => {
		const { body, error } = await supabase.rpc('posts_meta', { page: id - 1 });
		if (error) console.error(error);
		posts = body;
	});

	$: if (id) loadPosts();

	async function loadPosts() {
		const { body, error } = await supabase.rpc('posts_meta', { page: id - 1 });
		if (error) console.error(error);
		posts = body;
	}

	/** @type {import('$lib/types').Post[]} */
	let posts = [];

	$: console.log(posts);
</script>

<svelte:head>
	<title>Catalog: Page {id} | Symbol Bucket</title>
	<meta property="og:title" content="Symbol Bucket" />
	<meta property="og:image" content="https://symbols.arks.moe/default-embed.png" />
	<meta property="og:description" content="Upload and share your Symbol Arts!" />
	<meta name="twitter:card" content="summary" />
</svelte:head>

<div class="grid grid-cols-3 justify-between gap-2 max-w-sm mx-auto py-16">
	<div class="col-span-1">
		<a href={`./${Number(id) - 1}`} class="btn btn-block {Number(id) === 1 ? 'btn-disabled' : ''}"
			>Previous</a
		>
	</div>

	<div class="col-span-1">
		<h2 class="font-bold text-3xl text-center">Page {id}</h2>
	</div>

	<div class="col-span-1">
		<a href={`./${Number(id) + 1}`} class="btn btn-block {posts.length < 20 ? 'btn-disabled' : ''}"
			>Next</a
		>
	</div>
</div>

<div class="max-w-5xl mx-auto p-2">
	{#if posts.length <= 0}
		<h3>Unable to find any posts</h3>
	{/if}
	<ul class="grid sm:grid-cols-2 gap-4 p-4 justify-center">
		{#each posts as post (post.post_id)}
			<SymbolArtCard {post} />
		{/each}
	</ul>
</div>

<div class="grid grid-cols-3 justify-between gap-2 max-w-sm mx-auto py-16">
	<div class="col-span-1">
		<a href={`./${Number(id) - 1}`} class="btn btn-block {Number(id) === 1 ? 'btn-disabled' : ''}"
			>Previous</a
		>
	</div>

	<div class="col-span-1">
		<h2 class="font-bold text-3xl text-center">Page {id}</h2>
	</div>

	<div class="col-span-1">
		<a href={`./${Number(id) + 1}`} class="btn btn-block {posts.length < 20 ? 'btn-disabled' : ''}"
			>Next</a
		>
	</div>
</div>
