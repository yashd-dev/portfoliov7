/* empty css                           */
import { f as createAstro, c as createComponent, d as renderTemplate, e as renderComponent, m as maybeRenderHead, g as addAttribute } from '../astro_CmaGI-iH.mjs';
import { g as getCollection } from './__otQSqNGY.mjs';
import $$Layout from './layout_BAt1wj08.mjs';
import { $ as $$Image } from './generic_DCg_eSPW.mjs';

const $$Astro$1 = createAstro("https://yashd.tech/");
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Index$1;
  const allPosts = await getCollection("posts");
  let sortedPosts = allPosts.sort(
    (a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
  );
  sortedPosts = sortedPosts.filter((post) => post.data.draft === true);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Yash D's Blogs", "imgurl": "https://yashd.tech/preview.png", "description": "Blog page of Yash Deshpande :)" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="w-full min-h-screen flex flex-col justify-center max-w-6xl gap-10 mx-auto pt-[10vh] relative"> <h1 class="font-bold uppercase text-title">Blogs</h1> ${sortedPosts.slice(0, 5).map((post) => renderTemplate`<a class=" flex flex-row justify-between items-center border-2 rounded-2xl p-4  max-w-5xl group hover:bg-card/85 hover:border-transparent"${addAttribute(`/blog/${post.slug}/`, "href")}> <div class=" space-y-10 max-w-xl"> <h2 class=" font-bold text-4xl group-hover:underline group-hover:text-pink"> ${post.data.title} </h2> <p class=" text-xl">${post.data.description}</p> </div> ${post.data.image.url !== "" && renderTemplate`<img${addAttribute(post.data.image.url, "src")}${addAttribute(post.data.image.alt, "alt")} class=" size-44  object-cover rounded-3xl transition group-hover:sepia">`} </a>`)} </section> ` })}`;
}, "/home/yashd-dev/Documents/hehe/src/pages/blog/index.astro", void 0);

const $$file$1 = "/home/yashd-dev/Documents/hehe/src/pages/blog/index.astro";
const $$url$1 = "/blog";

const index$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index$1,
	file: $$file$1,
	url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const black = new Proxy({"src":"/_astro/black..B9seynJ8.jpg","width":3456,"height":1947,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/yashd-dev/Documents/hehe/src/assets/black..jpg";
							}
							
							return target[name];
						}
					});

const white = new Proxy({"src":"/_astro/white.C4EOam4b.jpg","width":3632,"height":2645,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/yashd-dev/Documents/hehe/src/assets/white.jpg";
							}
							
							return target[name];
						}
					});

const logo = new Proxy({"src":"/_astro/logo.D2e32l9u.png","width":500,"height":500,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/yashd-dev/Documents/hehe/src/assets/logo.png";
							}
							
							return target[name];
						}
					});

const pfe = new Proxy({"src":"/_astro/PFE-Logo.H80X4Lrt.png","width":666,"height":273,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/yashd-dev/Documents/hehe/src/assets/PFE-Logo.png";
							}
							
							return target[name];
						}
					});

const hand = new Proxy({"src":"/_astro/RPS Screenshot.CkkM2DfD.png","width":1684,"height":882,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/yashd-dev/Documents/hehe/src/assets/RPS Screenshot.png";
							}
							
							return target[name];
						}
					});

const chatapp = new Proxy({"src":"/_astro/chatapp.DkFxm_hy.jpeg","width":1535,"height":625,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/yashd-dev/Documents/hehe/src/assets/chatapp.jpeg";
							}
							
							return target[name];
						}
					});

const aws = new Proxy({"src":"/_astro/aws.CZaueDkG.svg","width":27,"height":8,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/yashd-dev/Documents/hehe/src/assets/aws.svg";
							}
							
							return target[name];
						}
					});

const $$Astro = createAstro("https://yashd.tech/");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const allPosts = await getCollection("posts");
  let sortedPosts = allPosts.sort(
    (a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
  );
  sortedPosts = sortedPosts.filter((post) => post.data.draft === true);
  const projects = [
    {
      name: "ACM Chronicles",
      description: "Monthly tech newsletter by ACM MPSTME. Lead developer & editor. Built with Astro, Tailwind CSS & Sanity.io.",
      image: logo,
      link: "https://mpstme.acm.org/newsletter/"
    },
    {
      name: "ACM MPSTME Website",
      description: "Lead Developer for the ACM MPSTME Studen Chapter Website. The website is built using Astro and Tailwind CSS.",
      image: logo,
      link: "https://mpstme.acm.org"
    },
    {
      name: "Rock Paper Scissors",
      description: "Rock Paper Scissors game built with OpenCV, Python and Mediapipe. The game is played with hand gestures.",
      image: hand,
      link: "https://github.com/yashd-dev/RPS-using-OpenCv"
    },
    {
      name: "Programming For Eveyone",
      description: "ACM MPSTME event: Teaching programming to students. Lead developer for website. Built with Astro & Tailwind CSS.",
      image: pfe,
      link: "https://pfe.mpstme.hosting.acm.org/"
    },
    {
      name: "Chat App",
      description: "A realtime chat app built with React, Firebase and Tailwind CSS. The app is currently discontinued.",
      image: chatapp,
      link: "https://github.com/Amazing-ChatApp/"
    },
    {
      name: "DevOps Pipeline",
      description: "Github Actions pipeline for a college community backend. The pipeline is built with Github Actions and AWS. Under development, stay tuned for the blog post!",
      image: aws,
      link: ""
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "imgurl": "https://yashd.tech/preview.png", "title": "Yash D's Portfolio", "description": "A portfolio page of Yash Deshpande :)" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="w-full min-h-screen flex flex-col justify-center max-w-6xl gap-10 mx-auto py-[10vh] relative"> ${renderComponent($$result2, "Image", $$Image, { "class": "md:absolute top-24 right-0 w-72 rotate-12 h-fit object-cover rounded-2xl border-4 border-peach", "src": black, "alt": "black" })} ${renderComponent($$result2, "Image", $$Image, { "class": "md:absolute -mt-[12vh] md:mt-0 top-44 right-0 w-72 -rotate-12 h-fit object-cover rounded-2xl border-4 border-green", "src": white, "alt": "white" })} <h1 class="2xl:text-[10vw] 2xl:space-y-16 font-bold uppercase text-title">
Yash<br> Deshpande
</h1> <ul class="flex flex-col md:flex-row gap-5 md:gap-10 text-body font-semibold *:tracking-wider"> <li class="text-green">Student</li> <li>Dev&lt;&gt;loper</li> <li class="text-blue italic">I use Arch BTW</li> </ul> <section class="md:bg-card w-full h-fit rounded-2xl md:p-7 text-paragraph font-normal md:border border-lav tracking-wide text-justify"> <p>
Hello everyone, I'm Yash, a Student Developer who is proficient
				at Frontend Web Development and knows a great deal about
				Operating Systems! Currently, I am working on making a Github
				AWS Pipeline for a college community backend, grinding leetcode
				on the side. I am also building a community of Developers called
<a href="https://neurotechh.live/" class="text-green underline hover:no-underline hover:text-pink">NeuroTechh</a>. These are the ones with actual progress thus worth
				mentioning; I have a million more pending, stay tuned for that
				:)
</p> </section> <h1 class="2xl:text-[10vw] 2xl:space-y-16 font-bold uppercase text-title">
Projects
</h1> <section class="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-around gap-10"> ${projects.map((project) => renderTemplate`<a${addAttribute(project.link, "href")}${addAttribute(`w-full h-full py-10 rounded-2xl transition duration-300 p-4 hover:bg-card/85 flex flex-col justify-around hover:shadow-lg hover:border-transparent border-2 gap-5`, "class")}> ${renderComponent($$result2, "Image", $$Image, { "src": project.image, "alt": "", "class": "h-24 w-24 items-center justify-center rounded-full object-contain  shadow-md shadow-slate-100/5 border border-slate-400/50 bg-slate-950 " })} <h1 class="font-bold uppercase text-2xl fill"> ${project.name} </h1> <p class="text-lg text-justify"> ${project.description} </p> </a>`)} </section> <h1 class="2xl:text-[10vw] 2xl:space-y-16 font-bold uppercase text-title">
Blogs
</h1> <a href="/blog/" class="text-green font-semibold text-body italic hover:underline">
Show all
</a> ${sortedPosts.map((post) => renderTemplate`<a class=" flex flex-row justify-between items-center border-2 rounded-2xl p-4  max-w-5xl group hover:bg-card/85 hover:border-transparent hover:shadow-lg transition duration-300 gap-5"${addAttribute(`/blog/${post.slug}/`, "href")}> <div class=" space-y-10 max-w-xl"> <h2 class=" font-bold text-4xl group-hover:underline"> ${post.data.title} </h2> <p class=" text-xl group-hover:italic text-justify"> ${post.data.description} </p> </div> ${post.data.image.url !== "" && renderTemplate`<img${addAttribute(post.data.image.url, "src")}${addAttribute(post.data.image.alt, "alt")} class=" size-44  object-cover rounded-3xl transition group-hover:sepia">`} </a>`)} </section>` })}`;
}, "/home/yashd-dev/Documents/hehe/src/pages/index.astro", void 0);

const $$file = "/home/yashd-dev/Documents/hehe/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { index as a, index$1 as i };
