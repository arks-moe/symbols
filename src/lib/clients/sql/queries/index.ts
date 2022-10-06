import { sql } from '$lib/clients';

export async function getPageCountAll(): Promise<number> {
	const [{ count }] = await sql<{ count: number }[]>`/* SQL */
    select count(*) / 20 :: real as count
    from posts
  `;
	return count;
}
