/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 0.6s ease-in-out",
        "slide-up": "slideUp 0.8s ease-out",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      fontFamily: {
        sans: ["Red Hat Display", "sans-serif"],
        serif: ["Instrument Serif", "sans-serif"],
      },
      colors: {
        background: "rgb(17,16,16)",
        card: "#18181b",
        border: "rgba(63,63,70,.4)",
        cream: "rgb(251, 250, 244)",
        accent: "#dc2626",
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