import supabase from '$lib/supabase-client';
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
	let { page, user } = config ? config : {};
	page ??= currentView.page;
	user ??= currentView.user;

	currentView = { page, user };

	if (user) {
		const { body, error } = await supabase.rpc('posts_meta_from_user', {
			page: page - 1,
			from_user_id: user
		});
		if (error) throw new Error(error.message);
		postView.set(body);
		return;
	}

	const { body, error } = await supabase.rpc('posts_meta', { page: 0 });
	if (error) console.error(error);
	postView.set(body);
	return;
}
