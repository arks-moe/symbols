<script>
	// @ts-nocheck
	import supabase from '$lib/supabase-client';

	async function signInWithTwitter() {
		const { user, session, error } = await supabase.auth.signIn({
			provider: 'twitter'
		});
		console.log('user:', user);
		console.log('session:', session);
		console.log('error:', error);
	}

	async function signout() {
		const { error } = await supabase.auth.signOut();
		console.log('error:', error);
	}

	supabase.auth.onAuthStateChange((event, session) => {
		console.log('Auth State has Changed:', event, session);
	});
</script>

<button class="btn" on:click={signInWithTwitter}>Sign In</button>
<button class="btn" on:click={() => console.log('user:', supabase.auth.user())}
	>Log Current User</button
>
<button class="btn" on:click={() => console.log('session:', supabase.auth.session())}
	>Log Current Session</button
>
<button class="btn" on:click={signout}>Sign Out</button>
