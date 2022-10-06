// we need to make sure the supabase instance is initialized on the server
import '$lib/clients/supabase';
import { auth } from '@supabase/auth-helpers-sveltekit/server';

export const handle = auth();
