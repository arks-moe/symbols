<script context="module">
	import supabase from '$lib/supabase-client';

	/** @type {import('./__types/[id]').Load} */
	export async function load({ params }) {
		const { id: id_of_post } = params;
		if (Number.isNaN(Number(id_of_post))) {
			return {};
		}
		const {
			data: [post],
			error
		} = await supabase.rpc('posts_meta_single', {
			id_of_post
		});

		if (error) console.error(error);

		return {
			status: 200,
			props: {
				post,
				id_of_post
			}
		};
	}
</script>

<script>
	import SymbolArtCard from '$components/SymbolArtCard.svelte';

	export let post;
	export let id_of_post;
	const thumbnail = post
		? supabase.storage.from('symbols').getPublicUrl(post.thumbnail_filename).publicURL
		: null;
</script>

<svelte:head>
	{#if post}
		<meta property="og:title" content={post.title} />
		<meta property="og:image" content={thumbnail} />
		<meta property="og:description" content={`from @${post.username}`} />
		<meta property="twitter:card" content="summary_large_image" />
	{/if}
</svelte:head>

{#if post}
	<div class="max-w-xl mx-auto py-8">
		<SymbolArtCard {post} />
	</div>
{:else}
	<div class="max-w-xl mx-auto py-16">
		<h2 class="font-black text-3xl text-center">Unable to find post with ID "{id_of_post}".</h2>
		<a class="btn btn-block mt-16" href="/">Back Home</a>
	</div>
{/if}
