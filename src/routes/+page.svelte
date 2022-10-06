<script lang="ts">
	import { page } from '$app/stores';
	import { signInWithTwitter, signOut } from '$lib/clients/supabase';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<h3>adding something else here!</h3>

<h1 class="font-black text-4xl">Current User: {$page.data.session.user?.id}</h1>
<button class="btn" on:click={() => signInWithTwitter($page.url.origin)}>Sign In</button>
<button class="btn" on:click={() => signOut()}>Sign Out</button>

<a href="/" class="btn">Home</a>
<a href="/test" class="btn">test</a>
