<script>
	import '../app.css';
	import AudioPlayer from '$components/AudioPlayer.svelte';
	import Header from '$components/Header.svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { session } from '$app/stores';
	import { supabaseClient } from '$lib/db';
	import { SupaAuthHelper } from '@supabase/auth-helpers-svelte';
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
<SupaAuthHelper {supabaseClient} {session}>
	<div class="bg-base-300 min-h-screen">
		<Header />
		<slot />
		<footer class="py-16">
			<div class="divider w-96 mx-auto pb-8" />
			<ul class="flex justify-center gap-8">
				<li>
					<a title="About Page" href="/about" class="btn btn-circle btn-ghost"
						><i class="text-4xl fa-solid fa-circle-info" /></a
					>
					<a
						title="GitHub Repository"
						target="_blank"
						href="https://github.com/arks-moe/symbol-bucket"
						class="btn btn-circle btn-ghost"><i class="text-4xl fa-brands fa-github" /></a
					>
				</li>
			</ul>
		</footer>
	</div>
</SupaAuthHelper>

<style>
	:root {
		--toastContainerTop: auto;
		--toastContainerRight: auto;
		--toastContainerBottom: 1rem;
		--toastContainerLeft: calc(50vw - 8rem);
	}
</style>
