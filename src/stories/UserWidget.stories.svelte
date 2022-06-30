<!-- Button.stories.svelte -->
<script>
	import '../app.css';
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import SymbolArtCard from '../components/SymbolArtCard.svelte';

	const example = {
		post_id: 28,
		title: 'Hmmmm?',
		sar_filename: '6f052b35-022c-4385-acac-b08e1e953188.sar',
		thumbnail_filename: 'thumbnail-6f052b35-022c-4385-acac-b08e1e953188.png',
		created_at: '2022-06-30T19:36:23.160518+00:00',
		user_id: 'e6519bd1-77d8-4d0c-b7e1-371393b5f72c',
		picture: 'https://pbs.twimg.com/profile_images/1455459279809376259/12nkb6Ww_normal.jpg',
		username: 'jojobii_',
		thumbnail:
			'https://ukerwykabjfrwjecunfv.supabase.co/storage/v1/object/public/symbols/thumbnail-6f052b35-022c-4385-acac-b08e1e953188.png'
	};
</script>

<Meta
	title="Symbol Art Card"
	component={`SymbolArtCard`}
	argTypes={{
		post_id: { control: 'number' },
		title: { control: 'text' },
		sar_filename: { control: 'text' },
		thumbnail_filename: { control: 'text' },
		created_at: { control: 'text' },
		user_id: { control: 'text' },
		picture: { control: 'text' },
		username: { control: 'text' },
		thumbnail: { control: 'text' }
	}}
/>

<Template let:args>
	<div class="bg-base-300 h-screen flex justify-center items-center">
		<SymbolArtCard post={args} />
	</div>
</Template>

<Story name="Primary" args={example} />
