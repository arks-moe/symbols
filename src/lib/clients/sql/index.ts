import postgres from 'postgres';
import { SUPABASE_DB_CONNECTION_URL } from '$env/static/private';

const sql = postgres(SUPABASE_DB_CONNECTION_URL);

export default sql;
