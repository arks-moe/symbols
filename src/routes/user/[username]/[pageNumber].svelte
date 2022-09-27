<script context="module">
	import { supabaseClient } from '$lib/db';

	/** @type {import('../../../../.svelte-kit/types/src/routes/user/[userid]/__types/[pageNumber]').Load} */
	export async function load({ params }) {
		const { username } = params;
		const { data, error } = await supabaseClient.rpc('users_meta').eq('username', username);
		if (error) console.error(error);
		return {
			props: {
				username: data[0] ? data[0].username : ''
			}
		};
	}
</script>

<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import SymbolArtCard from '$components/SymbolArtCard.svelte';
	import { loadPosts, postView } from '$stores/postView';
	import { goto } from '$app/navigation';
	import { pageNumberSchema } from '$lib/schemas';

	export let username = null;
	let pageNumber = $page.params.pageNumber;
	$: pageNumber = $page.params.pageNumber;

	const twitterUrl = `https://twitter.com/${username}`;

	onMount(async () => {
		$postView = [];
		console.log(!pageNumberSchema.isValidSync(pageNumber));
		if (!pageNumberSchema.isValidSync(pageNumber)) goto('/');
		loadPosts({ page: pageNumber, user: username });
	});

	$: loadPosts({ page: pageNumber, user: username });
</script>

<svelte:head>
	{#if username}
		<title>{username}: Page {pageNumber} | Symbol Bucket</title>
	{/if}
	<meta property="og:title" content="Symbol Bucket" />
	<meta property="og:image" content="https://symbols.arks.moe/default-embed.png" />
	<meta property="og:description" content="Upload and share your Symbol Arts!" />
	<meta name="twitter:card" content="summary" />
</svelte:head>

{#if !username}
	<h2 class="text-4xl font-black text-center py-8">
		Unable to find user with provided username...
	</h2>
	<h3 class="text-center font-semibold text-2xl">(@{$page.params.username})</h3>
{:else}
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
{/if}
