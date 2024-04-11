// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Define a `type` and `schema` for each collection
import slugify from "slugify";
const postsCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		pubDate: z.date(),
		description: z.string(),

		image: z.object({
			url: z.string(),
			alt: z.string(),
		}),
		tags: z.array(z.string()),
		production: z.boolean(),
	}),
});
// Export a single `collections` object to register your collection(s)
export const collections = {
	posts: postsCollection,
};
