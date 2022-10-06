import { createClient } from '@supabase/supabase-js';
import { setupSupabaseHelpers } from '@supabase/auth-helpers-sveltekit';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/public';

export const supabaseClient = createClient(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_ANON_KEY, {
	persistSession: false,
	autoRefreshToken: false
});

export const supabaseAuthClient = supabaseClient.auth;

export async function signInWithTwitter(redirectToURL?: string) {
	const { user, session, error } = await supabaseAuthClient.signIn(
		{
			provider: 'twitter'
		},
		{
			redirectTo: redirectToURL ?? undefined
		}
	);
	return { user, session, error };
}

export async function signOut() {
	const { error } = await supabaseAuthClient.signOut();
	return { error };
}

setupSupabaseHelpers({
	supabaseClient,
	cookieOptions: {
		secure: !dev
	}
});
