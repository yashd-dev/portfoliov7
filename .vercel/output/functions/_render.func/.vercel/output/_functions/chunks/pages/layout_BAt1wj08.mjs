/* empty css                           */
import { f as createAstro, c as createComponent, d as renderTemplate, e as renderComponent, g as addAttribute, k as renderSlot, l as renderHead } from '../astro_CmaGI-iH.mjs';
/* empty css                           */
import clsx from 'clsx';

const $$Astro$1 = createAstro("https://yashd.tech/");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Index;
  const propsStr = JSON.stringify(Astro2.props);
  const paramsStr = JSON.stringify(Astro2.params);
  return renderTemplate`${renderComponent($$result, "vercel-speed-insights", "vercel-speed-insights", { "data-props": propsStr, "data-params": paramsStr, "data-pathname": Astro2.url.pathname })} `;
}, "/home/yashd-dev/Documents/hehe/node_modules/.pnpm/@vercel+speed-insights@1.0.10/node_modules/@vercel/speed-insights/dist/astro/index.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://yashd.tech/");
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { imgurl, title, description } = Astro2.props;
  console.log(title, imgurl, description);
  return renderTemplate(_a || (_a = __template(['<html lang="en" data-astro-cid-uvny4fad> <head><meta name="title"', '><meta name="description"', '><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url" content="https://yashd.tech"><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url" content="https://yashd.tech/"><meta property="twitter:title"', '><meta property="twitter:description"', '><meta property="twitter:image"', '><link rel="sitemap" href="/sitemap-index.xml"><meta charset="UTF-8"><link rel="icon" type="image/svg+xml" href="https://yashd.tech/favicon.ico"><meta name="viewport" content="width=device-width"><link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet"><meta name="generator"', "><title>Yash D</title>", '</head> <body class="bg-background text-text min-w-screen min-h-[100vh] bg-build-white md:overflow-clip pt-[10vh] md:pt-0 px-10 md:px-32" data-astro-cid-uvny4fad> ', " ", ' <nav class="fixed w-[50vw] h-[9vh] md:h-[30vh] md:w-[15vh] rounded-2xl top-10 left-[20%] md:left-[1%] md:top-1/3 bg-card border-2 border-pink" id="navbar" data-astro-cid-uvny4fad> <div class="relative w-full h-full" data-astro-cid-uvny4fad> <a href="/" rel="prefetch" data-astro-cid-uvny4fad> <i data-lucide="home"', ' data-astro-cid-uvny4fad></i> </a> <a href="/blog/" rel="prefetch" data-astro-cid-uvny4fad> <i data-lucide="book-text"', ' data-astro-cid-uvny4fad></i> </a> </div> </nav> <script>\n			if (window.innerWidth < 768) {\n				let lastScrollTop =\n					window.scrollY || document.documentElement.scrollTop;\n				const navbar = document.getElementById("navbar");\n\n				window.addEventListener("scroll", function () {\n					const scrollTop =\n						window.scrollY || document.documentElement.scrollTop;\n\n					if (scrollTop > lastScrollTop) {\n						navbar.style.transition = "top 0.3s";\n						navbar.style.top = "-80px";\n					} else {\n						navbar.style.transition = "top 0.3s";\n						navbar.style.top = "20px";\n					}\n\n					lastScrollTop = scrollTop;\n				});\n			}\n		<\/script> <script src="https://unpkg.com/lucide@latest"><\/script> <script>\n			lucide.createIcons();\n		<\/script> <script src="https://unpkg.com/@studio-freight/lenis@1.0.42/dist/lenis.min.js"><\/script> <script>\n			document.addEventListener("DOMContentLoaded", () => {\n				const lenis = new Lenis();\n\n				function raf(time) {\n					lenis.raf(time);\n					requestAnimationFrame(raf);\n				}\n\n				requestAnimationFrame(raf);\n			});\n		<\/script>  </body> </html>'])), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(imgurl, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(imgurl, "content"), addAttribute(Astro2.generator, "content"), renderHead(), renderComponent($$result, "SpeedInsights", $$Index, { "data-astro-cid-uvny4fad": true }), renderSlot($$result, $$slots["default"]), addAttribute(clsx(
    "size-10 md:size-[4vw] text-white rounded-2xl p-1 md:p-3 mx-auto absolute transition left-5  md:left-0 md:right-0 top-5 hover:bg-green hover:text-black",
    {
      "bg-green !text-black": Astro2.url.pathname === "/"
    }
  ), "class"), addAttribute(clsx(
    "size-10 md:size-[4vw] text-white rounded-2xl p-1 md:p-3 mx-auto absolute right-5 md:left-0 md:right-0 top-5 md:bottom-5 md:top-auto transition hover:bg-green hover:text-black",
    {
      "bg-green !text-black": Astro2.url.pathname === "/blog/"
    }
  ), "class"));
}, "/home/yashd-dev/Documents/hehe/src/pages/layout.astro", void 0);

const $$file = "/home/yashd-dev/Documents/hehe/src/pages/layout.astro";
const $$url = "/layout";

export { $$Layout as default, $$file as file, $$url as url };
