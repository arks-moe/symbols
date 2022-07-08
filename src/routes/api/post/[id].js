import ClientError from '$lib/server/client-error';
import errorHandler from '$lib/server/error-handler';
import supabase from '$lib/supabase-server-client';
/** @type {import('./types/[id]').RequestHandler} */
export async function get({ params }) {
	try {
		const { id } = params;
		const { data, error } = await supabase.rpc('posts_meta_single', {
			id_of_post: id
		});
		if (error) {
			console.log(error);
			throw new Error(error);
		}
		if (!data.length) throw new ClientError(404, `Couldn't find post ${id}`);

		return {
			status: 200,
			body: data
		};
	} catch (err) {
		console.error(err);
		return errorHandler(err);
	}
}
