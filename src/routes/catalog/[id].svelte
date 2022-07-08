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

<div class="flex justify-between gap-2 max-w-sm mx-auto py-16">
	<a href={`./${Number(id) - 1}`} class="btn">Previous</a>
	<h2 class="font-bold text-3xl text-center">Page {id}</h2>
	<a href={`./${Number(id) + 1}`} class="btn">Next</a>
</div>

<div class="max-w-5xl mx-auto p-2">
	<ul class="grid sm:grid-cols-2 gap-4 p-4 justify-center">
		{#each posts as post}
			<SymbolArtCard {post} />
		{/each}
	</ul>
</div>

<div class="flex justify-between gap-2 max-w-sm mx-auto py-16">
	<a href={`./${Number(id) - 1}`} class="btn">Previous</a>
	<h2 class="font-bold text-3xl text-center">Page {id}</h2>
	<a href={`./${Number(id) + 1}`} class="btn">Next</a>
</div>
