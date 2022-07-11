<script>
	import bucketDownloadRename from '$lib/bucket-download-rename';
	import supabase from '$lib/supabase-client';
	import { playSound } from './AudioPlayer.svelte';
	import sounds from '$lib/symbol/sound-catalog';
	import { goto } from '$app/navigation';
	import user from '$stores/userSession';
	import { toastSuccess } from '$lib/toasts';
	export let post;
	let currentUser = $user ? $user.id : null;
	$: currentUser = $user ? $user.id : null;

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
	const thumbnail = supabase.storage.from('symbols').getPublicUrl(thumbnail_filename).publicURL;
	const formattedDate = new Date(created_at).toLocaleDateString();
	const postUrl = `/post/${post_id}`;

	function download() {
		bucketDownloadRename('symbols', sar_filename, `${title}.sar`);
	}

	async function deletePost() {
		const { data, error } = await supabase
			.from('posts')
			.delete({ returning: 'representation' })
			.eq('id', post_id);
		if (error) console.error(error);
		if (data) {
			toastSuccess('Post has been deleted!');
			goto('/');
		}
	}
</script>

<li class="rounded-box p-2 bg-base-100 flex flex-col justify-between">
	<div class="aspect-[2/1] hover:translate-y-0.5">
		<a href={postUrl}><img class="rounded-box" src={thumbnail} alt="" /></a>
	</div>
	<div class="flex-1">
		<a href={postUrl}>
			<h3 class="font-semibold text-lg link-hover">{title}</h3>
		</a>
		<h4 class="italic">@{username}</h4>
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
