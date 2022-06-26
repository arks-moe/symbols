<script>
	// @ts-nocheck
	import supabase from '$lib/supabase-client';
	import user from '$stores/userSession';
	import UserWidget from '$components/UserWidget.svelte';
	import downloadRename from '$lib/download-and-rename';

	supabase.auth.onAuthStateChange((event, session) => {
		console.log('Auth State has Changed:', event, session);
		$user = supabase.auth.user();
	});
</script>

<UserWidget />

<button
	class="btn"
	on:click={() => {
		fetch('/api/download/rename', {
			method: 'POST',
			body: JSON.stringify({
				filename: 'thumbnail-shrimp.png',
				renamed: 'bababooey.png'
			})
		})
			.then(res => {
				console.log(res);
				return res;
			})
			.then(res => res.blob())
			.then(blob => URL.createObjectURL(blob))
			.then(href => {
				const a = document.createElement('a');
				document.body.appendChild(a);
				a.style = 'display: none';
				a.href = href;
				a.download = 'bazinga.png';
				a.click();
			})
			.catch(console.error);
	}}>Download test file</button
>

<button
	class="btn"
	on:click={() => {
		downloadRename('symbols', 'thumbnail-shrimp.png', 'bazingabruh.png');
	}}>Download but epic</button
>
