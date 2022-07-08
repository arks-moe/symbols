<script context="module">
	let sounds;

	export function playSound(id) {
		sounds.forEach(e => {
			if (!e) {
				return;
			}
			e.pause();
			e.currentTime = 0;
		});
		if (!sounds[id]) {
			return;
		}
		try {
			sounds[id].play();
		} catch (err) {
			console.error(err);
		}
	}
</script>

<script>
	import soundCatalog from '$lib/symbol/sound-catalog';
	import { onMount } from 'svelte';

	onMount(() => {
		sounds = soundCatalog.map(sound => {
			if (sound.path === '') return null;
			return new Audio(`/res/${sound.path}`);
		});
	});
</script>
