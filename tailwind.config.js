const { guessProductionMode } = require("@ngneat/tailwind");

process.env.TAILWIND_MODE = guessProductionMode() ? "build" : "watch";

module.exports = {
  prefix: "",
  mode: "jit",
  purge: {
    content: ["./src/**/*.{html,ts,css,scss,sass,less,styl}"],
  },
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        calibre: ["Calibre Regular", "san-serif"],
        geomanist: ["Geomanist Regular", "san-serif"],
      },
      colors: {
        accent: "#012547",
        accentBlue: "#058ED3",
        paleBg: "#EEF3FC",
        orange: {
          100: "hsl(39deg 100% 80%)",
          900: "hsl(39deg 100% 50%)",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
  ],
};
