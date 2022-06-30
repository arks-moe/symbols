const preprocess = require('svelte-preprocess');

module.exports = {
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx|svelte)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-svelte-csf',
		'@storybook/addon-postcss'
	],
	framework: '@storybook/svelte',
	svelteOptions: {
		preprocess: preprocess({
			postcss: true
		}),
		kit: {
			alias: {
				$components: '/src/components',
				$stores: '/src/stores'
			}
		}
	}
};
