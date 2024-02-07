/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        "global-text": "rgb(245, 246, 250)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
