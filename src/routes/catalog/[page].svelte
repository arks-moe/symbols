<script>
	import supabase from '$lib/supabase-client';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	onMount(async () => {
		const { body, error } = await supabase.rpc('posts_meta', { page: $page.params.page });
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

<div class="max-w-3xl mx-auto">
	<ul class="grid md:grid-cols-2">
		{#each posts as post}
			<li class="rounded-box bg-base-100 grid grid-cols-6">
				<img class="col-span-2" src={post.thumbnail} alt="" />
				<h3 class="col-span-4">{post.title}</h3>
			</li>
		{/each}
	</ul>
</div>
