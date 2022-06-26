<script>
	import renderSar from '$lib/symbol/render';
	import processSarBuffer from '$lib/symbol/sar-parse';
	import { beforeUpdate } from 'svelte';
	import * as PIXI from 'pixi.js';

	/** @type {File[] | null} */
	let files;
	let renderedFile;
	let loading = false;

	$: if (files && files[0]) {
		//prettier-ignore
		loading = true;
		files[0]
			.arrayBuffer()
			.then(processSarBuffer)
			.then(renderSar)
			.then(dataUrl => {
				renderedFile = dataUrl;
				loading = false;
			})
			.catch(err => {
				console.error(err);
				files = null;
				loading = false;
			});
	}

	beforeUpdate(() => PIXI.utils.destroyTextureCache());
</script>

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
