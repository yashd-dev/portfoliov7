import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import fs from "fs";
import parseFrontmatter from "gray-matter";
import slugify from "slugify";

// const svg = (title)=>  ({
// 	type: "div",
// 	props: {
// 		children: [
// 			{
// 				type: "div",
// 				props: {
// 					children: null,
// 					style: {
// 						height: "100%",
// 						width: "100%",
// 						display: "flex",
// 						position: "absolute",
// 						justifyContent: "center",
// 						backgroundColor: "#09090b",
// 						color: "rgb(259, 244, 218)",
// 						backgroundImage:
// 							"url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNTYgNTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTAgNTZWME0yOCA1NlYwTTU2IDU2VjBNNTYgMjhIME01NiAyOEgwTTU2IDBIME01NiA1NkgwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIC8+Cjwvc3ZnPg==')",
// 						backgroundSize: "86px 86px",
// 						backgroundPosition: "center 0",
// 						filter: "brightness(0.2)",
// 						zIndex: -99,
// 					},
// 				},
// 			},
// 			{
// 				type: "p",
// 				props: {
// 					children: "Thoughts on Going about in Tech ",
// 					style: {
// 						marginTop: 40,
// 						fontSize: 52,
// 						display: "flex",
// 						padding: 10,
// 						alignItems: "center",
// 					},
// 				},
// 			},
// 			{
// 				type: "p",
// 				props: {
// 					children: [
// 						{
// 							type: "img",
// 							props: {
// 								src: "https://yashd.tech/images/white.jpg",
// 								alt: "Yashd",
// 								style: {
// 									borderRadius: "100%",
// 									width: "50px",
// 									height: "50px",
// 									objectFit: "cover",
// 									marginRight: 20,
// 								},
// 							},
// 						},
// 						"by yashd-dev",
// 					],
// 					style: {
// 						display: "flex",
// 						padding: 10,
// 						alignItems: "center",
// 						color: "rgb(181, 229, 196)",
// 					},
// 				},
// 			},
// 		],
// 		style: {
// 			height: "100%",
// 			width: "100%",
// 			display: "flex",
// 			position: "relative",
// 			justifyContent: "center",
// 			fontSize: 22,
// 			fontWeight: 600,
// 			color: "rgb(259, 244, 218)",
// 			flexDirection: "column",
// 			alignItems: "center",
// 		},
// 	},
// });

// for

// const outfit = fs.readFileSync("./Outfit-Bold.ttf");
// const output = await satori(svg, {
// 	width: 1200,
// 	height: 430,
// 	fonts: [
// 		{
// 			name: "Outfit",
// 			// Use `fs` (Node.js only) or `fetch` to read the font as Buffer/ArrayBuffer and provide `data` here.
// 			data: outfit,
// 			weight: 700,
// 			style: "bold",
// 		},
// 	],
// });

// const resvg = new Resvg(output, {
// 	fitTo: {
// 		mode: "width",
// 		value: 1200,
// 	},
// });

// fs.writeFileSync(`og.png`, resvg.render().asPng());
// console.log(`\x1b[32mog:\x1b[0m Generated OpenGraph images\n`);

const svg = (title) => ({
	type: "div",
	props: {
		children: [
			{
				type: "div",
				props: {
					children: null,
					style: {
						height: "100%",
						width: "100%",
						display: "flex",
						position: "absolute",
						justifyContent: "center",
						backgroundColor: "#09090b",
						color: "rgb(259, 244, 218)",
						backgroundImage:
							"url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNTYgNTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTAgNTZWME0yOCA1NlYwTTU2IDU2VjBNNTYgMjhIME01NiAyOEgwTTU2IDBIME01NiA1NkgwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIC8+Cjwvc3ZnPg==')",
						backgroundSize: "86px 86px",
						backgroundPosition: "center 0",
						filter: "brightness(0.2)",
						zIndex: -99,
					},
				},
			},
			{
				type: "p",
				props: {
					children: title,
					style: {
						marginTop: 40,
						fontSize: 52,
						display: "flex",
						padding: 10,
						alignItems: "center",
					},
				},
			},
			{
				type: "p",
				props: {
					children: [
						{
							type: "img",
							props: {
								src: "https://yashd.tech/images/white.jpg",
								alt: "Yashd",
								style: {
									borderRadius: "100%",
									width: "50px",
									height: "50px",
									objectFit: "cover",
									marginRight: 20,
								},
							},
						},
						"by yashd-dev",
					],
					style: {
						display: "flex",
						padding: 10,
						alignItems: "center",
						color: "rgb(181, 229, 196)",
					},
				},
			},
		],
		style: {
			height: "100%",
			width: "100%",
			display: "flex",
			position: "relative",
			justifyContent: "center",
			fontSize: 22,
			fontWeight: 600,
			color: "rgb(259, 244, 218)",
			flexDirection: "column",
			alignItems: "center",
		},
	},
});

const outfit = fs.readFileSync("./Outfit-Bold.ttf");
const postsDirectory = "src/content/posts";
const files = fs.readdirSync(postsDirectory);
files.forEach(async (file) => {
	const filePath = `${postsDirectory}/${file}`;
	const fileContent = fs.readFileSync(filePath, "utf-8");
	const title = parseFrontmatter(fileContent).data;
	const output = await satori(svg(title.title), {
		width: 1200,
		height: 430,
		fonts: [
			{
				name: "Outfit",
				// Use `fs` (Node.js only) or `fetch` to read the font as Buffer/ArrayBuffer and provide `data` here.
				data: outfit,
				weight: 700,
				style: "bold",
			},
		],
	});
	const resvg = new Resvg(output, {
		fitTo: {
			mode: "width",
			value: 1200,
		},
	});
	fs.writeFileSync(
		`public/og/${slugify(title.title, {
			lower: true,
			trim: true,
			remove: undefined,
		})}.png`,
		resvg.render().asPng()
	);
});
