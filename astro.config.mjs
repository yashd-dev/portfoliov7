import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind()],
	markdown: {
		shikiConfig: {
			theme: "vitesse-black",

			wrap: true,
			// Add custom transformers: https://shiki.style/guide/transformers
			// Find common transformers: https://shiki.style/packages/transformers
			transformers: [],
		},
	},
});
