import type { RequestHandler } from './$types';
import type { Post } from '$lib/interfaces';
import { json, error as httpError } from '@sveltejs/kit';
import { sql } from '$lib/clients';
import * as yup from 'yup';
import schemas from '$lib/schemas';
import { getPageCountAll } from '$lib/clients/sql/queries';

const searchParamsSchema = yup.object({
	page_offset: schemas.pageOffset.required()
});

export const GET: RequestHandler = async ({ url }) => {
	try {
		const searchParams = Object.fromEntries(url.searchParams.entries());
		const { page_offset } = searchParamsSchema.validateSync(searchParams);
		const posts = await sql<Post[]>`/* SQL */
			with users_meta as (
				select
					id as user_id,
					raw_user_meta_data ->> 'preferred_username' as username
				from auth.users
			)
		  select
				id as post_id,
				title,
				ingame_name,
				ingame_sound_id,
				ingame_layer_count,
				sar_filename,
				thumbnail_filename,
				created_at,
				user_id,
				username
			from posts
			join users_meta using (user_id)
			order by created_at desc
			offset ${page_offset} * 20
			limit 20;
		`;
		const totalPageCount = await getPageCountAll();
		return json({ posts, totalPageCount });
	} catch (error) {
		if (error instanceof yup.ValidationError) {
			throw httpError(400, { message: error.message });
		} else {
			console.error(error);
			throw httpError(500, 'Something went wrong...');
		}
	}
};
