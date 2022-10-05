import { SupabaseStorageClient } from '@supabase/storage-js';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';

const STORAGE_URL = `${PUBLIC_SUPABASE_URL}/storage/v1`;

const storage = new SupabaseStorageClient(STORAGE_URL, {
	apikey: SUPABASE_SERVICE_ROLE_KEY,
	Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`
});

export default storage;
