import { defineConfig, squooshImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";
import { remarkReadingTime } from "./remark-reading-time.mjs";
import rehypeExternalLinks from "rehype-external-links";

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind(), sitemap()],
	site: "https://yashd.tech/",
	markdown: {
		gfm: true,
		shikiConfig: {
			theme: "houston",
			wrap: true,
		},
		remarkPlugins: [remarkReadingTime],
		rehypePlugins: [
			[
				rehypeExternalLinks,
				{
					target: "_blank",
					rel: ["nofollow", "noopener", "noreferrer"],
				},
			],
		],
	},
	image: {
		service: squooshImageService(),
	},
	output: "server",
	adapter: vercel({
		imageService: true,
		webAnalytics: {
			enabled: true,
		},
	}),
	prefetch: true,
});
