import { createClient } from '@supabase/supabase-js';

// Supposedly, this is safe... lmao
const supabaseUrl = `https://govahthyxiauwdtteylw.supabase.co`;
const supabaseAnonKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvdmFodGh5eGlhdXdkdHRleWx3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTYxMTkzMTcsImV4cCI6MTk3MTY5NTMxN30.E8KwqGUuPkoTnn4THd4uV0tPSAYdmbdoNn0Iax3A1E4`;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
