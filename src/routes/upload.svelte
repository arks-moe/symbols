<script>
	import renderSar from '$lib/symbol/render';
	import processSarBuffer from '$lib/symbol/sar-parse';
	import { beforeUpdate } from 'svelte';
	import * as PIXI from 'pixi.js';
	import { toastError, toastPromise, toastSuccess } from '$lib/toasts';
	import supabase from '$lib/supabase-client';

	/** @type {File[] | null} */
	let files;

	/** @type {File | null} - A successfully loaded file */
	let loadedFile;

	/** @type {String} - Data URL of Rendered Image */
	let renderedFile;

	let previewOpen = false;
	let loading = false;

	$: if (files && files[0]) loadFile(files[0]);

	function loadFile(sarFile) {
		previewOpen = true;
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
				toastError(err.message);
				loadedFile = null;
				previewOpen = false;
				loading = false;
			});
	}

	/** @type {String} - User input for title of post */
	let title = '';

	function upload() {
		let errorMessage;
		toastPromise(
			fetch(renderedFile)
				.then(res => res.blob())
				.then(thumbnail => {
					const formData = new FormData();
					formData.append('title', title);
					formData.append('sar', loadedFile);
					formData.append('thumbnail', thumbnail);

					return fetch('/api/upload', {
						method: 'POST',
						body: formData,
						headers: { 'X-Access-Token': supabase.auth.session().access_token }
					});
				})
				.then(res => Promise.all([res.ok, res.json()]))
				.then(([ok, json]) => {
					if (!ok) throw new Error(json.error);
					console.log(json);
				}),
			{
				loading: 'Uploading Post...',
				success: 'Post has been uploaded!'
			}
		);
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
	<form on:submit|preventDefault={upload} class="flex flex-col items-center gap-4">
		<div class="rounded-box bg-base-100 p-4 w-full">
			<label for="file" class="btn btn-block btn-secondary">Load .sar file</label>
			<input type="file" name="file" id="file" accept=".sar" bind:files hidden />
		</div>

		{#if previewOpen}
			<div class="rounded-box p-4 bg-base-100 prose min-w-full">
				<h3>preview</h3>
				{#if loading}
					<progress class="progress w-full" />
				{:else if renderedFile}
					<img class="rounded-box aspect-[2/1]" src={renderedFile} alt="Rendered File Preview" />
				{/if}
			</div>
			{#if renderedFile}
				<div class="w-full rounded-box flex flex-col gap-4 bg-base-100 py-4">
					<div class="form-control flex flex-col gap-3 px-4">
						<label for="title" class="flex items-center">
							<span class="text-xl font-semibold">Post Title</span>
						</label>
						<div>
							<input
								bind:value={title}
								id="title"
								type="text"
								class="input h-fit w-full bg-base-300 p-2 leading-none"
								required
							/>
						</div>
					</div>
				</div>

				<div class="rounded-box bg-base-100 p-4 w-full">
					<button class="btn btn-block btn-accent">Upload!</button>
				</div>
			{/if}
		{/if}
	</form>
</div>
