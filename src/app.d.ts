declare namespace App {
	interface Locals {
		session: import('@supabase/auth-helpers-sveltekit').SupabaseSession;
	}
	interface PageData {
		session: import('@supabase/auth-helpers-sveltekit').SupabaseSession;
	}
	// interface Error {}
	// interface Platform {}
}
