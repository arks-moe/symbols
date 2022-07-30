import('dotenv/config');
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './public-env';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
