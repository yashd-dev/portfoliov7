import { getCollection } from "astro:content";
const allPosts = await getCollection("posts");
import slugify from "slugify";

let options = {
	lower: true,
	trim: true,
	remove: undefined as undefined,
};

let sortedPosts = allPosts.sort(
	(a, b) =>
		new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
);
sortedPosts = sortedPosts.filter((post) => post.data.production === true);

sortedPosts = sortedPosts.map((post) => {
	// Slugify each tag in the post
	post.data.tags = post.data.tags.map((tag) => slugify(tag, options));
	return post;
});
// Exporting Posts That are not drafts

let tags: string[] = [];

sortedPosts.forEach((post) => {
	const currentTags = post.data.tags || [];
	tags.push(...currentTags);
});

tags = [...new Set(tags)];

function unslugify(slug: string) {
	return slug
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

export { tags, sortedPosts, unslugify };
