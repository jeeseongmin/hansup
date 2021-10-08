// tailwind.config.js
module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				hansupBrown: "#6C4D3F",
				homePink: "#FCF4ED",
				homeGray: "#F1F0EC",
			},
			width: {
				"3/10": "30%",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [
		require("tailwind-scrollbar-hide"),
		// ...
	],
};
