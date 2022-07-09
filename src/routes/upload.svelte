<script>
	import { Sprite2d } from 'pixi-projection';
	import convertRGBtoHex from '$lib/symbol/rgb-to-hex';
	import { onMount } from 'svelte';

	let renderSar;

	onMount(async () => {
		const PIXI = await import('pixi.js');
		renderSar = sar => {
			const promise = new Promise(resolve => {
				PIXI.utils.destroyTextureCache();
				const app = new PIXI.Application({
					width: 760,
					height: 380,
					antialias: true,
					preserveDrawingBuffer: true,
					autoDensity: true,
					backgroundAlpha: 0,
					clearBeforeRender: true
				});

				const resolution = 4;

				app.loader.add('spritesheet', '../spritesheet.json').load(() => {
					const container = new PIXI.Container();
					app.stage.addChild(container);

					const spritesheet = app.loader.resources.spritesheet;

					const layers = [...sar.layers].reverse();

					const offsetX = -126;
					const offsetY = -317;

					for (let i = 0; i < layers.length; i++) {
						const layer = layers[i];
						const layerPath = `${layer.props.textureIndex + 1}.png`;
						const corners = [
							{
								x: layer.points.topLeft.x * resolution + offsetX,
								y: layer.points.topLeft.y * resolution + offsetY
							},
							{
								x: layer.points.topRight.x * resolution + offsetX,
								y: layer.points.topRight.y * resolution + offsetY
							},
							{
								x: layer.points.bottomRight.x * resolution + offsetX,
								y: layer.points.bottomRight.y * resolution + offsetY
							},
							{
								x: layer.points.bottomLeft.x * resolution + offsetX,
								y: layer.points.bottomLeft.y * resolution + offsetY
							}
						];
						const { props } = layer;
						const { colorR, colorG, colorB, transparency, visible } = props;

						let trueAlpha = transparency / 7;
						if (!visible) trueAlpha = 0;

						const trueR = colorR * 4;
						const trueG = colorG * 4;
						const trueB = colorB * 4;

						const hex = convertRGBtoHex(trueR, trueG, trueB);

						const sprite = new Sprite2d(spritesheet.textures[layerPath]);
						sprite.anchor.set(0.5);
						sprite.tint = hex;
						sprite.alpha = trueAlpha;
						sprite.proj.mapSprite(sprite, corners);

						container.addChild(sprite);
					}
					app.renderer.addListener('postrender', () => {
						resolve(app.view.toDataURL());
						app.destroy();
					});
				});
			});

			return promise;
		};
	});

	import processSarBuffer from '$lib/symbol/sar-parse';
	import { toastError, toastPromise, toastSuccess } from '$lib/toasts';
	import supabase from '$lib/supabase-client';

	/** @type {File[] | null} */
	let files;

	/** @type {File | null} - A successfully loaded file */
	let loadedFile;

	/** @type {Object | null} - The parsed sar buffer as an object */
	let parsedSar;
	$: console.log(parsedSar);

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

	function upload(event) {
		if (disabled) return;
		disabled = true;
		toastPromise(
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
					console.log(json);
					event.target.reset();
					loadedFile = null;
					parsedSar = null;
					previewOpen = false;
					renderedFile = null;
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
								bind:value={title}
								id="title"
								type="text"
								class="input h-fit w-full bg-base-300 p-2 leading-none"
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
