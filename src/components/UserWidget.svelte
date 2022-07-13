<script>
	import supabase from '$lib/supabase-client';
	import user from '$stores/userSession';

	async function signInWithTwitter() {
		const { user, session, error } = await supabase.auth.signIn({
			provider: 'twitter'
		});
		if (error) console.error(error);
	}

	async function signout() {
		const { error } = await supabase.auth.signOut();
		if (error) console.error('error:', error);
	}

	let currentUser;
	$: currentUser = $user ? $user.id : null;
	let userUrl = $user ? `/user/${$user.id}/1` : null;
</script>

<div class="card card-compact bg-base-300 text-base-content w-fit">
	<div class="card-body items-center">
		<div class="card-title justify-between gap-4 w-full">
			{#if $user}
				<div class="avatar">
					<div class="w-8 rounded-full">
						<img
							src={$user.user_metadata.avatar_url}
							alt={$user.user_metadata.preferred_username}
						/>
					</div>
				</div>
			{/if}
			<h2>
				{#if $user}
					<a href={userUrl} class="link-hover">@{$user.user_metadata.preferred_username}</a>
				{:else}
					Not Logged In
				{/if}
			</h2>
		</div>
		<div class="card-actions w-full">
			{#if $user}
				<button on:click={signout} class="btn btn-primary btn-xs w-full">Sign Out</button>
			{:else}
				<button on:click={signInWithTwitter} class="btn btn-primary btn-xs w-full">Sign In</button>
			{/if}
		</div>
	</div>
</div>
