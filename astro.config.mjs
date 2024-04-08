import { defineConfig, squooshImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind()],
	site: "https://yashd.tech/",
	markdown: {
		shikiConfig: {
			theme: "vitesse-black",
			wrap: true,
			// Add custom transformers: https://shiki.style/guide/transformers
			// Find common transformers: https://shiki.style/packages/transformers
			transformers: [],
		},
	},
	image: {
		service: squooshImageService(),
	},
	output: "server",
	adapter: vercel({
		imageService: true,
		devImageService: "squoosh",
		webAnalytics: { enabled: true },
	}),
});
