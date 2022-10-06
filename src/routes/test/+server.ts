import type { RequestHandler } from './$types';
import { json, error as httpError } from '@sveltejs/kit';
import { storage } from '$lib/clients';

export const GET: RequestHandler = async () => {
	const { data, error } = await storage.from('symbols').list();
	if (error) throw httpError;
	return json(data);
};
