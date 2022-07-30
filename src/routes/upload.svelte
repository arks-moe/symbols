<script>
	import { onMount } from 'svelte';

	let renderSar;

	onMount(async () => {
		renderSar = (await import('$lib/symbol/render')).default;
	});

	import processSarBuffer from '$lib/symbol/sar-parse';
	import { toastError, toastPromise, toastSuccess } from '$lib/toasts';
	import supabase from '$lib/supabase-public-client';
	import { goto } from '$app/navigation';
	import { postSchema } from '$lib/schemas';
	import { reach } from 'yup';

	/** @type {File[] | null} */
	let files;

	/** @type {File | null} - A successfully loaded file */
	let loadedFile;

	/** @type {Object | null} - The parsed sar buffer as an object */
	let parsedSar;

	/** @type {String} - Data URL of Rendered Image */
	let renderedFile;

	let previewOpen = false;
	let loading = false;
	let disabled = false;

	$: if (files && files[0]) loadFile(files[0]);

	function loadFile(sarFile) {
		disabled = true;
		previewOpen = true;
		loading = true;
		sarFile
			.arrayBuffer()
			.then(processSarBuffer)
			.then(sar => {
				parsedSar = sar;
				return renderSar(sar);
			})
			.then(dataUrl => {
				loadedFile = sarFile;
				renderedFile = dataUrl;
				loading = false;
			})
			.catch(err => {
				toastError(err.message);
				loadedFile = null;
				parsedSar = null;
				previewOpen = false;
				loading = false;
			})
			.finally(() => {
				disabled = false;
			});
	}

	/** @type {String} - User input for title of post */
	let title = '';

	function handleInput(e) {
		let { value, name } = e.target;
		let isValid = reach(postSchema, name).isValidSync(value);
		if (!isValid && value.length !== 0) {
			e.target.value = title;
			return;
		}
		title = value;
	}

	function upload(event) {
		if (disabled) return;
		disabled = true;
		toastPromise(
			async () =>
				fetch(renderedFile)
					.then(res => res.blob())
					.then(thumbnail => {
						if (!supabase.auth.session()) throw new Error('Authentication required.');

						const { name, layerCount, soundEffect } = parsedSar;
						const formData = new FormData();
						formData.append('title', title);
						formData.append('sar', loadedFile);
						formData.append('thumbnail', thumbnail);
						formData.append('ingame_name', name);
						formData.append('ingame_layer_count', layerCount);
						formData.append('ingame_sound_id', soundEffect);

						return fetch('/api/upload', {
							method: 'POST',
							body: formData,
							headers: { 'X-Access-Token': supabase.auth.session().access_token }
						});
					})
					.then(res => Promise.all([res.ok, res.json()]))
					.then(([ok, json]) => {
						if (!ok) throw new Error(json.error);
						event.target.reset();
						loadedFile = null;
						parsedSar = null;
						previewOpen = false;
						renderedFile = null;
						goto(`/post/${json.id}`);
					})
					.finally(() => {
						disabled = false;
					}),
			{
				loading: 'Uploading Post...',
				success: 'Post has been uploaded!'
			}
		);
	}
</script>

<svelte:head><title>Upload | Symbol Bucket</title></svelte:head>

<svelte:window
	on:dragenter|preventDefault|stopPropagation
	on:dragover|preventDefault|stopPropagation
	on:drop|preventDefault|stopPropagation={event => {
		if (event.dataTransfer.files[0]) loadFile(event.dataTransfer.files[0]);
	}}
/>

<div class="max-w-xl mx-auto p-4 rounded-box my-8">
	<form on:submit|preventDefault={upload} class="flex flex-col items-center gap-4">
		<div class="rounded-box bg-base-100 p-4 w-full">
			<label for="file" class={`btn btn-block btn-secondary ${disabled ? 'btn-disabled' : ''}`}
				>Load .sar file</label
			>
			<input {disabled} type="file" name="file" id="file" accept=".sar" bind:files hidden />
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
								name="title"
								type="text"
								class="input h-fit w-full bg-base-300 p-2 leading-none"
								on:input={handleInput}
								required
								{disabled}
							/>
						</div>
					</div>
				</div>

				<div class="rounded-box bg-base-100 p-4 w-full">
					<button {disabled} class="btn btn-block btn-accent">Upload!</button>
				</div>
			{/if}
		{/if}
	</form>
</div>
