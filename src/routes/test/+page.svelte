<script lang="ts">
	// import type { PageData } from './$types';
	// export let data: PageData;

	import { page } from '$app/stores';
</script>

<h1>Current User: {$page.data.session.user?.user_metadata}</h1>
<a href="/" class="btn">Home</a>
