/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				background: "#09090b",
				card: "#18181b",
				text: "rgb(259, 244, 218)",
				border: "rgba(63,63,70,.4)",
				pink: "rgb(243, 139, 163)",
				blue: "rgb(18, 181, 229)",
				lav: "rgb(204, 153, 255)",
				peach: "rgb(255, 204, 153)",
				green: "rgb(181, 229, 196)",
			},
			fontFamily: {
				sans: ["Outfit", "sans-serif"],
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
