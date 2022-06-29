import('dotenv/config');
import ClientError from '$lib/server/client-error';
import errorHandler from '$lib/server/error-handler';
import supabase from '$lib/supabase-server-client';

// TODO make profiles table that mirrors what a users_meta() call would do because users table is unavailable to access :/

/** @type {import('./__types/upload').RequestHandler} */
export async function get({ params }) {
	try {
		const { page } = params;
		if (!page) throw new ClientError(400, 'please provide page as param (number)');
		const { data, error } = await supabase.rpc('posts_meta', { page });
		if (error) {
			console.log(error);
			throw new Error('Error grabbing posts, something went wrong...');
		}
		return {
			body: { data }
		};
	} catch (err) {
		console.error(err);
		return errorHandler(err);
	}
}
