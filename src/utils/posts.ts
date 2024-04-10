import { getCollection } from "astro:content";
const allPosts = await getCollection("posts");

let sortedPosts = allPosts.sort(
	(a, b) =>
		new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
);
sortedPosts = sortedPosts.filter((post) => post.data.draft === true);

let tags:String[] = [];

sortedPosts.forEach((post) => {
	const currentTags = post.data.tags || [];
	tags.push(...currentTags);
});

tags = [...new Set(tags)];

export { tags, sortedPosts };
