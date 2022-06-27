<script>
	// @ts-nocheck
	import bucketDownloadRename from '$lib/bucket-download-rename';
	import { toast } from '@zerodevx/svelte-toast';
</script>

<button
	class="btn"
	on:click={() => {
		bucketDownloadRename('symbols', 'thumbnail-shrimp.png', 'bazingabruh.png');
	}}>Download but epic</button
>

<button
	on:click={() => {
		toast.push('bazinga', {
			theme: {
				'--toastBackground': '#F56565',
				'--toastBarBackground': '#C53030'
			}
		});
	}}
>
	push toast
</button>
