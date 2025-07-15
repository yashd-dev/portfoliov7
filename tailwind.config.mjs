/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Red Hat Display", "sans-serif"],
        serif: ["Instrument Serif", "sans-serif"],
      },
      colors: {
        background: "rgb(17,16,16)",
        card: "#18181b",
        border: "rgba(63,63,70,.4)",
        // pink: "rgb(243, 139, 163)",
        // blue: "rgb(18, 181, 229)",
        // lav: "rgb(204, 153, 255)",
        // peach: "rgb(255, 204, 153)",
        // green: "rgb(181, 229, 196)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animated"),
  ],
};
