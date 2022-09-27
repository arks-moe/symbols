import { supabaseClient } from '$lib/db';
import { writable } from 'svelte/store';

export const postView = writable([]);

let currentView = {
	page: 1,
	user: null
};

/**
 *
 * @param {{} | null} config - Configuration settings. If null, reload with the previous settings.
 * @param {Number} config.page - Page of posts to grab (20 posts/page)
 * @param {String | null} config.user - UUID of user to fetch from, if null, fetch all
 */
export async function loadPosts(config) {
	if (!config) config = currentView;
	const { page, user } = config;
	currentView = { page, user };

	try {
		if (!Number.isInteger(Number(currentView.page))) throw new Error('Incorrect catalog page.');

		if (user) {
			const { body, error } = await supabaseClient.rpc('posts_meta_from_username', {
				page: page - 1,
				from_username: user
			});
			if (error) throw new Error(error.message);
			postView.set(body);
			return;
		}

		const { body, error } = await supabaseClient.rpc('posts_meta', { page: page - 1 });
		if (error) throw new Error(error.message);
		postView.set(body);
		return;
	} catch (error) {
		postView.set([]);
		console.error(error);
	}
}
