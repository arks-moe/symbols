import('dotenv/config');
import { SUPABASE_URL } from './public-env';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE);

export default supabase;
