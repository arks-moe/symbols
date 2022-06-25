import supabase from '$lib/supabase-client';
import * as yup from 'yup';

const postSchema = yup.object().shape({
	filename: yup.string().required(),
	renamed: yup.string().required()
});

/** @type {import('./__types/rename').RequestHandler} */
export async function post({ request }) {
	let body;
	try {
		body = await request.json();
		await postSchema.validate(body);
	} catch (error) {
		if (error instanceof SyntaxError) {
			return {
				status: 400,
				body: 'Expecting JSON input {filename: string, renamed: string}'
			};
		}
		return {
			status: 400,
			// @ts-ignore
			body: { error }
		};
	}

	const { filename, renamed } = body;

	console.log(filename);
	console.log();

	const { data, error } = await supabase.storage.from('public/symbols').download(filename);
	// @ts-ignore
	if (error) return { body: { error }, status: 404 };
	console.log(data);

	return {
		headers: {
			'Content-Disposition': `attachment; filename="${filename}"`,
			'Content-Type': 'image/png'
		},
		body: new Uint8Array(await data?.arrayBuffer()),
		status: 200
	};
}
