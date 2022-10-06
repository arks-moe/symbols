import type { RequestHandler } from './$types';
import { error as httpError, json } from '@sveltejs/kit';
import { sql } from '$lib/clients';

export const GET: RequestHandler = async () => {
	try {
		const data = await sql`/* SQL */
			select * from posts
		`;
		return json(data);
	} catch {
		throw httpError;
	}
};
