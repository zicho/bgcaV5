module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}', './src/lib/components/**/*.{html,js,svelte,ts}'],
	daisyui: {
		themes: ['corporate']
	},
	theme: {
		extend: {}
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')]
};
