<script>
	import supabase from '$lib/supabase-public-client';
	import user from '$stores/userSession';
	import UserWidget from './UserWidget.svelte';
	import { dev } from '$app/env';

	async function signInWithTwitter() {
		const { user, error } = await supabase.auth.signIn(
			{
				provider: 'twitter'
			},
			{
				redirectTo: dev ? 'http://localhost:5173' : 'https://symbols.arks.moe'
			}
		);
		if (error) console.error('error:', error);
	}
</script>

<div
	class="navbar justify-between
	max-w-3xl mx-auto bg-primary 
	rounded-b-box text-primary-content sticky 
	top-0 bg-opacity-75 backdrop-blur z-50"
>
	<div class="">
		<a class="btn btn-ghost normal-case text-3xl font-black" href="/">Symbol Bucket</a>
	</div>
	<div class="ml-auto">
		<ul class="hidden sm:flex gap-2">
			<li><a href="/about" class="btn btn-ghost">About</a></li>
			{#if $user}
				<li><a class="btn btn-ghost" href="/upload">Upload</a></li>
				<li>
					<div class="dropdown dropdown-end">
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<label tabindex="0" class="btn btn-circle btn-ghost avatar">
							<div class="w-10 rounded-full">
								<img src={$user.user_metadata.avatar_url} alt="Avatar" />
							</div>
						</label>
						<div tabindex="0" class="dropdown-content shadow-sm">
							<UserWidget />
						</div>
					</div>
				</li>
			{:else}
				<li>
					<button class="btn btn-ghost" on:click={signInWithTwitter}
						>Sign In <i class="fa-brands fa-twitter text-2xl pl-4" /></button
					>
				</li>
			{/if}
		</ul>
		<div class="dropdown dropdown-end sm:hidden">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label tabindex="0" class="btn btn-ghost"><i class="text-xl fa-solid fa-bars" /></label>
			<ul
				tabindex="0"
				class="flex flex-col gap-2 dropdown-content p-2 shadow bg-primary rounded-box w-52 mt-4 "
			>
				<li><a href="/about" class="btn btn-ghost btn-block">About</a></li>
				{#if $user}
					<li><a class="btn btn-ghost btn-block" href="/upload">Upload</a></li>
					<UserWidget />
				{:else}
					<li>
						<button class="btn btn-ghost btn-block" on:click={signInWithTwitter}
							>Sign In <i class="fa-brands fa-twitter text-2xl pl-4" /></button
						>
					</li>
				{/if}
			</ul>
		</div>
	</div>
</div>
