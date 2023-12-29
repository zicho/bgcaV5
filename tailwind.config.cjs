module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	daisyui: {
		themes: [
			{
				light: {
					...require("daisyui/src/theming/themes")["light"],
					"--rounded-box": "0",
					"--rounded-btn": "0",
					"--rounded-badge": "0",
					"primary": "DarkRed",
					"primary-content": "GhostWhite",
          			"secondary": "RebeccaPurple",
				},
			},
		],
	},
	theme: {
		extend: {
			borderRadius: {
				'none': '0',
			},
		},
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
