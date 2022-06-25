import { createClient } from '@supabase/supabase-js';

// Supposedly, this is safe... lmao
const supabaseUrl = `https://ukerwykabjfrwjecunfv.supabase.co`;
const supabaseAnonKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrZXJ3eWthYmpmcndqZWN1bmZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTYxMzg5NjMsImV4cCI6MTk3MTcxNDk2M30.wJISIhbLD9Qj8qvN6OrVlvNBTPUZwtuo12zt8VWkptk`;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
