/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Quicksand", "sans-serif"],
        quicksand: ["Quicksand", "sans-serif"],
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".backdrop-blur": {
          "backdrop-filter": "blur(5px)",
        },
        ".backdrop-blur-md": {
          "backdrop-filter": "blur(10px)",
        },
        ".backdrop-blur-lg": {
          "backdrop-filter": "blur(15px)",
        },
      });
    }),
  ],
};
