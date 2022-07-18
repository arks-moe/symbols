<script context="module">
	import supabase from '$lib/supabase-client';

	/** @type {import('../../../../.svelte-kit/types/src/routes/user/[userid]/__types/[pageNumber]').Load} */
	export async function load({ params }) {
		const { username } = params;
		const {
			data: [{ dbUsername }]
		} = await supabase.rpc('users_meta').eq('username', username);
		return {
			props: {
				username: dbUsername ? dbUsername : null
			}
		};
	}
</script>

<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import SymbolArtCard from '$components/SymbolArtCard.svelte';
	import { loadPosts, postView } from '$stores/postView';

	export let username;
	let pageNumber = $page.params.pageNumber;
	$: pageNumber = $page.params.pageNumber;

	const twitterUrl = `https://twitter.com/${username}`;

	onMount(async () => {
		$postView = [];
		loadPosts({ page: pageNumber, user: username });
	});

	$: loadPosts({ page: pageNumber, user: username });
</script>

<svelte:head>
	<title>{username}: Page {pageNumber} | Symbol Bucket</title>
	<meta property="og:title" content="Symbol Bucket" />
	<meta property="og:image" content="https://symbols.arks.moe/default-embed.png" />
	<meta property="og:description" content="Upload and share your Symbol Arts!" />
	<meta name="twitter:card" content="summary" />
</svelte:head>

<h2 class="text-4xl font-black text-center py-4">
	Posts from <a class="link" target="_blank" href={twitterUrl}>@{username}</a>
</h2>

<div class="grid grid-cols-3 justify-between gap-2 max-w-sm mx-auto py-2">
	<div class="col-span-1">
		<a
			href={`./${Number(pageNumber) - 1}`}
			class="btn btn-block {Number(pageNumber) === 1 ? 'btn-disabled' : ''}">Previous</a
		>
	</div>

	<div class="col-span-1">
		<h2 class="font-bold text-3xl text-center">Page {pageNumber}</h2>
	</div>

	<div class="col-span-1">
		<a
			href={`./${Number(pageNumber) + 1}`}
			class="btn btn-block {$postView.length < 20 ? 'btn-disabled' : ''}">Next</a
		>
	</div>
</div>

<div class="max-w-5xl mx-auto p-2">
	{#if $postView.length <= 0}
		<h3 class="text-center">Unable to find any posts</h3>
	{/if}
	<ul class="grid sm:grid-cols-2 grid-cols-1 gap-4 p-4 justify-center">
		{#each $postView as post (post.post_id)}
			<SymbolArtCard {post} />
		{/each}
	</ul>
</div>

<div class="grid grid-cols-3 justify-between gap-2 max-w-sm mx-auto py-2">
	<div class="col-span-1">
		<a
			href={`./${Number(pageNumber) - 1}`}
			class="btn btn-block {Number(pageNumber) === 1 ? 'btn-disabled' : ''}">Previous</a
		>
	</div>

	<div class="col-span-1">
		<h2 class="font-bold text-3xl text-center">Page {pageNumber}</h2>
	</div>

	<div class="col-span-1">
		<a
			href={`./${Number(pageNumber) + 1}`}
			class="btn btn-block {$postView.length < 20 ? 'btn-disabled' : ''}">Next</a
		>
	</div>
</div>
