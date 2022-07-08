import('dotenv/config');
import jwt from 'jsonwebtoken';
import getFormBody from '$lib/server/get-form-body';
import ClientError from '$lib/server/client-error';
import errorHandler from '$lib/server/error-handler';
import yup from 'yup';
import supabase from '$lib/supabase-server-client';

//prettier-ignore
const postSchema = yup.object({
	title: yup.string().trim().required(),
	sar: yup
		.mixed()
		.test(
			'Is File{}', 
			`"sar" is not a application/octect-stream`, 
			value => value.type === 'application/octet-stream'),
	thumbnail: yup
		.mixed()
		.test(
			'Is File{}', 
			`"thumbnail" is not a image/png`, 
			value => value.type === 'image/png'),
	ingame_name: yup.string(),
	ingame_sound_id: yup.number(),
	ingame_layer_count: yup.number()
	
});

/** @type {import('./__types/upload').RequestHandler} */
export async function post({ request }) {
	try {
		const token = request.headers.get('X-Access-Token');
		if (!token) {
			throw new ClientError(400, 'Authorization required');
		}
		const { sub: user_id } = jwt.verify(token, process.env.SECRET_KEY);
		const formData = await request.formData();
		const body = getFormBody(formData);
		const { title, sar, thumbnail, ingame_name, ingame_sound_id, ingame_layer_count } = body;
		await postSchema.validate({
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
			supabase.storage.from('symbols').upload(sar_filename, sar, {
				contentType: 'application/octet-stream'
			}),
			supabase.storage
				.from('symbols')
				.upload(thumbnail_filename, thumbnail, { contentType: 'image/png' })
		]);

		const isSuccessful = uploads.reduce((prev, curr) => {
			if (curr.data && prev) return true;
			return false;
		}, true);

		if (!isSuccessful) {
			throw new Error('Upload failed, something went wrong...');
		}

		const {
			data: [newPost],
			error
		} = await supabase.from('posts').insert([
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
			throw new Error('Upload failed, something went wrong...');
		}

		console.log(newPost);

		return { status: 201, body: newPost };
	} catch (err) {
		console.error(err);
		return errorHandler(err);
	}
}
