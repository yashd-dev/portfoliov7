import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import fs from "fs/promises";
import parseFrontmatter from "gray-matter";
import slugify from "slugify";
import sharp from "sharp";

const svg = (title, avatarBase64) => ({
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
            textAlign: "center",
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
                src: avatarBase64,
                alt: "Yashd",
                width: 50,
                height: 50,
                style: {
                  borderRadius: "100%",
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

async function generateSEOImages() {
  const outfit = await fs.readFile("./Outfit-Bold.ttf");
  const postsDirectory = "src/content/posts";
  const files = await fs.readdir(postsDirectory);

  // Load and resize the avatar image
  const avatarBuffer = await fs.readFile("public/images/white.jpg");
  const resizedAvatarBuffer = await sharp(avatarBuffer)
    .resize(50, 50)
    .toBuffer();
  const avatarBase64 = `data:image/jpeg;base64,${resizedAvatarBuffer.toString('base64')}`;

  for (const file of files) {
    const filePath = `${postsDirectory}/${file}`;
    const fileContent = await fs.readFile(filePath, "utf-8");
    const { data: frontmatter } = parseFrontmatter(fileContent);

    const output = await satori(svg(frontmatter.title, avatarBase64), {
      width: 1200,
      height: 430,
      fonts: [
        {
          name: "Outfit",
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

    const pngBuffer = resvg.render().asPng();

    const outputFileName = slugify(frontmatter.title, {
      lower: true,
      trim: true,
      remove: undefined,
    });

    await fs.writeFile(`public/og/${outputFileName}.png`, pngBuffer);
    console.log(`Generated SEO image for: ${frontmatter.title}`);
  }
}

generateSEOImages().catch(console.error);