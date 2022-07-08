<script>
	import bucketDownloadRename from '$lib/bucket-download-rename';
	import supabase from '$lib/supabase-client';
	export let post;
	const {
		title,
		sar_filename,
		thumbnail_filename,
		created_at,
		username,
		ingame_name,
		ingame_sound_id
	} = post;
	const thumbnail = supabase.storage.from('symbols').getPublicUrl(thumbnail_filename).publicURL;
	const formattedDate = new Date(created_at).toLocaleDateString();

	function download() {
		bucketDownloadRename('symbols', sar_filename, `${title}.sar`);
	}
</script>

<li class="p-2 bg-base-100 flex flex-col justify-between">
	<div class="aspect-[2/1]">
		<img src={thumbnail} alt="" />
	</div>
	<div class="flex-1">
		<h3 class="font-semibold text-lg">{title}</h3>
		<h4 class="italic">@{username}</h4>
		<div class="flex gap-2 py-2">
			{#if ingame_name}
				<div class="badge badge-ghost">{ingame_name}</div>
			{/if}
			{#if ingame_sound_id}
				<div class="badge badge-ghost">{ingame_sound_id}</div>
			{/if}
		</div>
		<h4 class="text-sm italic">posted on {formattedDate}</h4>
	</div>
	<div class="pt-2">
		<button on:click={download} class="btn btn-secondary btn-sm btn-block">DL</button>
	</div>
</li>
