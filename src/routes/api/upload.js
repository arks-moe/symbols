import { SUPABASE_JWT_SECRET_KEY } from '$env/static/private';
import jwt from 'jsonwebtoken';
import getFormBody from '$lib/server/get-form-body';
import ClientError from '$lib/server/client-error';
import errorHandler from '$lib/server/error-handler';
import { postSchema } from '$lib/schemas';
import { supabaseServiceRoleClient } from '$lib/db-private';

/** @type {import('./__types/upload').RequestHandler} */
export async function POST({ request, locals }) {
	try {
		if (!locals.accessToken) {
			throw new ClientError(400, 'Authorization required');
		}
		const { sub: user_id } = jwt.verify(locals.accessToken, SUPABASE_JWT_SECRET_KEY);
		const formData = await request.formData();
		const body = getFormBody(formData);
		const { title, sar, thumbnail, ingame_name, ingame_sound_id, ingame_layer_count } = body;
		const validated = await postSchema.validate({
			title,
			sar,
			thumbnail,
			ingame_name,
			ingame_sound_id,
			ingame_layer_count
		});

		const filename = crypto.randomUUID();
		const sar_filename = `${filename}.sar`;
		const thumbnail_filename = `thumbnail-${filename}.png`;

		const uploads = await Promise.all([
			supabaseServiceRoleClient.storage.from('symbols').upload(sar_filename, sar.stream(), {
				contentType: 'application/octet-stream'
			}),
			supabaseServiceRoleClient.storage
				.from('symbols')
				.upload(thumbnail_filename, thumbnail.stream(), { contentType: 'image/png' })
		]);

		if (!uploads.some(e => e.data)) {
			throw new Error('Upload failed, something went wrong...');
		}

		const {
			data: [newPost],
			error
		} = await supabaseServiceRoleClient.from('posts').insert([
			{
				user_id,
				sar_filename,
				thumbnail_filename,
				title,
				ingame_name,
				ingame_sound_id,
				ingame_layer_count
			}
		]);

		if (error) {
			throw new Error('Database update failed, something went wrong...');
		}

		return { status: 201, body: newPost };
	} catch (err) {
		console.error(err);
		return errorHandler(err);
	}
}
