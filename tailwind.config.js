/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    fontFamily: {
      sans: ["Spartan", "sans-serif"],
    },
    extend: {
      backdropBlur: {
        xs: "2px",
      },
      screens: {
        "max-sm": { max: "639px" },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
