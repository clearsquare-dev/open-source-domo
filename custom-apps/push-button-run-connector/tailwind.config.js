/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,json}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Courier New"', "monospace"],
      },
      maxWidth: {
        "8xl": "90rem",
        "9xl": "120rem",
      },
      screens: {
        "2xl": "100rem",
        "3xl": "120rem",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
