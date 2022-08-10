<script>
	import bucketDownloadRename from '$lib/bucket-download-rename';
	import { supabaseClient } from '$lib/db';
	import sounds from '$lib/symbol/sound-catalog';
	import { session } from '$app/stores';
	import { playSound } from './AudioPlayer.svelte';
	import { goto } from '$app/navigation';
	import { toastPromise } from '$lib/toasts';
	import { loadPosts } from '$stores/postView';
	import { page } from '$app/stores';

	let currentUser;
	$: currentUser = $session.user ? $session.user.id : null;

	export let post;

	const {
		title,
		post_id,
		sar_filename,
		thumbnail_filename,
		created_at,
		username,
		user_id,
		ingame_name,
		ingame_sound_id
	} = post;
	const sound = sounds[ingame_sound_id];
	const thumbnail = supabaseClient.storage
		.from('symbols')
		.getPublicUrl(thumbnail_filename).publicURL;
	const formattedDate = new Date(created_at).toLocaleDateString();
	const postUrl = `/post/${post_id}`;
	const userUrl = `/user/${username}/1`;

	function download() {
		bucketDownloadRename('symbols', sar_filename, `${title}.sar`);
	}

	function deletePost() {
		toastPromise(
			async () => {
				const { data, error } = await supabaseClient
					.from('posts')
					.delete({ returning: 'representation' })
					.eq('id', post_id);
				if (error) throw new Error(error.message);
				if (!data[0]) throw new Error(`Couldn't find post with ID ${post_id}`);
				if ($page.routeId === 'post/[id]') {
					goto('/');
				} else {
					loadPosts();
				}
			},
			{
				loading: 'Deleting post...',
				success: 'Post has been deleted!'
			}
		);
	}
</script>

<li class="rounded-box p-2 bg-base-100 flex flex-col justify-between">
	<div class="aspect-[2/1] hover:translate-y-0.5">
		<a href={postUrl}><img class="rounded-box" src={thumbnail} alt="" /></a>
	</div>
	<div class="flex-1">
		<a href={postUrl}>
			<h3 class="font-semibold text-lg link-hover break-words max-w-full">
				{title}
			</h3>
		</a>
		<a href={userUrl}>
			<h4 class="italic link-hover">@{username}</h4>
		</a>
		<div class="flex gap-2 py-2">
			{#if ingame_name}
				<div class="badge badge-ghost badge-sm">
					<i class="fa-solid fa-file pr-1 text-xs" />{ingame_name}
				</div>
			{/if}
			{#if ingame_sound_id}
				<button
					on:click={() => {
						playSound(ingame_sound_id);
					}}
					class="badge badge-ghost badge-sm hover:brightness-95 select-none"
				>
					<i class="fa-solid fa-volume-high pr-1 text-xs" />{sound.name}
				</button>
			{/if}
		</div>
		<h4 class="text-sm italic">posted on {formattedDate}</h4>
	</div>
	<div class="pt-2 flex gap-2">
		<button on:click={download} class="btn btn-secondary btn-sm flex-1">Download</button>
		{#if user_id === currentUser}
			<button on:click={() => deletePost()} class="btn btn-error btn-sm hover:brightness-95"
				>Delete</button
			>
		{/if}
	</div>
</li>
