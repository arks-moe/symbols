import('dotenv/config');
import { createClient } from '@supabase/supabase-js';

// Supposedly, this is safe... lmao
const supabaseUrl = `https://ukerwykabjfrwjecunfv.supabase.co`;

const supabase = createClient(supabaseUrl, process.env.SERVICE_ROLE);

export default supabase;
