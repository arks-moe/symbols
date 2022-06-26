<script>
	import renderSar from '$lib/symbol/render';
	import processSarBuffer from '$lib/symbol/sar-parse';
	import { toast } from '@zerodevx/svelte-toast';
	import { beforeUpdate, onMount } from 'svelte';
	import * as PIXI from 'pixi.js';
	import user from '$stores/userSession';

	/** @type {File[] | null} */
	let files;
	let loadedFile;
	/** @type {String} - Data URL of Rendered Image */
	let renderedFile;
	let loading = false;

	$: if (files && files[0]) loadFile(files[0]);

	function loadFile(sarFile) {
		loading = true;
		sarFile
			.arrayBuffer()
			.then(processSarBuffer)
			.then(renderSar)
			.then(dataUrl => {
				loadedFile = sarFile;
				renderedFile = dataUrl;
				loading = false;
			})
			.catch(err => {
				toast.push(`Error: ${err.message}`, {
					theme: {
						'--toastBackground': '#F56565',
						'--toastBarBackground': '#C53030'
					}
				});
				loading = false;
			});
	}

	beforeUpdate(() => PIXI.utils.destroyTextureCache());
</script>

<svelte:window
	on:dragenter|preventDefault|stopPropagation
	on:dragover|preventDefault|stopPropagation
	on:drop|preventDefault|stopPropagation={event => {
		if (event.dataTransfer.files[0]) loadFile(event.dataTransfer.files[0]);
	}}
/>

<div class="max-w-3xl mx-auto p-4 rounded-box my-8">
	<form on:submit|preventDefault class="flex flex-col items-center gap-4">
		<div class="rounded-box bg-base-100 p-2 w-full">
			<label for="file" class="btn btn-block btn-secondary">Upload .sar file</label>
			<input type="file" name="file" id="file" accept=".sar" bind:files hidden />
		</div>

		{#if files && files[0]}
			<div class="rounded-box p-4 bg-base-100 prose min-w-full">
				<h3>preview</h3>
				{#if loading}
					<progress class="progress w-full" />
				{:else if renderedFile}
					<img class="rounded-box aspect-[2/1]" src={renderedFile} alt="Rendered File Preview" />
				{/if}
			</div>
		{/if}
	</form>
</div>
