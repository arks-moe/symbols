<script>
	import bucketDownloadRename from '$lib/bucket-download-rename';
	import { toastPromise } from '$lib/toasts';

	const sleep = t => new Promise(resolve => setTimeout(resolve, t));
</script>

<button
	class="btn"
	on:click={() => {
		bucketDownloadRename('symbols', 'thumbnail-shrimp.png', 'bazingabruh.png');
	}}>Download but epic</button
>

<button
	on:click={() =>
		toastPromise(sleep(5000), {
			loading: 'loading up',
			success: 'succesful!!!',
			error: 'some error message'
		})}
>
	push toast
</button>
