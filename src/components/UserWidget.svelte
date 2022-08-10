<script>
	import { session } from '$app/stores';
	let userUrl = $session.user ? `/user/${$session.user.user_metadata.preferred_username}/1` : null;
</script>

<div class="card card-compact bg-base-100 text-base-content w-full">
	<div class="card-body items-center">
		<div class="card-title justify-between gap-4 w-full">
			{#if $session.user}
				<div class="avatar">
					<div class="w-8 rounded-full">
						<img
							src={$session.user.user_metadata.avatar_url}
							alt={$session.user.user_metadata.preferred_username}
						/>
					</div>
				</div>
			{/if}
			<h2>
				{#if $session.user}
					<a href={userUrl} class="link-hover">@{$session.user.user_metadata.preferred_username}</a>
				{:else}
					Not Logged In
				{/if}
			</h2>
		</div>
		<div class="card-actions w-full">
			{#if $session.user}
				<a href="/api/auth/logout" class="btn btn-primary btn-xs w-full">Sign Out</a>
			{/if}
		</div>
	</div>
</div>
