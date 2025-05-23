import {
  defineConfig,
  squooshImageService,
  sharpImageService,
} from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";
import { remarkReadingTime } from "./remark-reading-time.mjs";
import rehypeExternalLinks from "rehype-external-links";
import autolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import { h } from "hastscript";

// The following configuration for rehype-autolink-headings was taken from https://github.com/withastro/docs/blob/main/astro.config.ts
import partytown from "@astrojs/partytown";
import playformCompress from "@playform/compress";
const AnchorLinkIcon = h(
  "svg",
  {
    width: 16,
    height: 16,
    version: 1.1,
    viewBox: "0 0 16 16",
    xlmns: "http://www.w3.org/2000/svg",
  },
  h("path", {
    fillRule: "evenodd",
    fill: "currentcolor",
    d: "M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z",
  })
);

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), sitemap(), partytown(), playformCompress()],
  site: "https://yashd.in/",
  markdown: {
    gfm: true,
    shikiConfig: {
      theme: "catppuccin-latte",
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
      rehypeSlug,
      [
        autolinkHeadings,
        {
          behavior: "append",
          group: ({ tagName }) =>
            h(`div.heading-wrapper.level-${tagName}`, {
              tabIndex: -1,
            }),
          content: (heading) => [
            h(
              `span.anchor-icon`,
              {
                ariaHidden: "true",
              },
              AnchorLinkIcon
            ),
          ],
        },
      ],
    ],
  },
  image: {
    service: squooshImageService(),
  },
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  prefetch: true,
});
