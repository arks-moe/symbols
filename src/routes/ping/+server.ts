import type { RequestHandler } from './$types';
import { getPageCountAll } from '$lib/clients/sql/queries';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const data = await getPageCountAll();
	return json(data);
};
