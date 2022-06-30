<script>
	import bucketDownloadRename from '$lib/bucket-download-rename';
	export let post;
	const {
		post_id,
		title,
		sar_filename,
		thumbnail_filename,
		created_at,
		user_id,
		picture,
		username,
		thumbnail
	} = post;
	const formattedDate = new Date(created_at).toLocaleDateString();

	function download() {
		bucketDownloadRename('symbols', sar_filename, `${title}.sar`);
	}
</script>

<li class="rounded-box bg-base-100 flex gap-2 p-2 items-center">
	<div class="aspect-[2/1] w-1/3">
		<img class="rounded-box" src={thumbnail} alt="" />
	</div>
	<div class="flex-1 flex flex-col gap-2">
		<h3 class="font-bold">{title}</h3>
		<div class="flex justify-start items-center gap-2">
			<img class="h-8 rounded-full" src={picture} alt="" />
			<h4 class="font-semibold">@{username}</h4>
		</div>
		<div class="flex">
			<div class="badge badge-ghost">in-game Name</div>
			<div class="badge badge-ghost">Sound</div>
		</div>
		<h4 class="text-sm italic">posted on {formattedDate}</h4>
	</div>
	<div class="flex-shrink h-full">
		<button on:click={download} class="btn btn-secondary h-full">DL</button>
	</div>
</li>
