<script>
	import supabase from '$lib/supabase-client';
	import user from '$stores/userSession';
	import AudioPlayer from '$components/AudioPlayer.svelte';

	import '../app.css';
	import Header from '$components/Header.svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { onMount } from 'svelte';

	supabase.auth.onAuthStateChange((event, session) => {
		$user = supabase.auth.user();
	});

	onMount(() => {
		$user = supabase.auth.user();
	});
</script>

<svelte:head>
	<meta property="og:site_name" content="Symbol Bucket" />
	<meta property="og:url" content="https://symbols.arks.moe/" />
</svelte:head>

<AudioPlayer />

<SvelteToast
	options={{
		duration: 2000,
		reversed: true,
		intro: { y: 192 }
	}}
/>

<div class="bg-base-300 min-h-screen pb-16">
	<Header />
	<slot />
	<div class="w-fit mx-auto pt-4">
		<a href="https://github.com/arks-moe/symbol-bucket" class="btn btn-circle btn-ghost"
			><i class="text-4xl fa-brands fa-github" /></a
		>
	</div>
</div>

<style>
	:root {
		--toastContainerTop: auto;
		--toastContainerRight: auto;
		--toastContainerBottom: 1rem;
		--toastContainerLeft: calc(50vw - 8rem);
	}
</style>
