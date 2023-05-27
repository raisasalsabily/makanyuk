/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "serif"],
        sans: ["ClashDisplay-Regular", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        tomato: "#E50914",
        marigold: "#ffbe0b",
        transparent: "transparent",
        current: "currentColor",
        black: "#000000",
        yellow: "#FCCB45",
        white: "#FFFFFF",
        darkgreen: "#23230B",
        lightgray: "#ECEEF0",
        beige: "#F6EFCF",
      },
    },
    fontSize: {
      "h-xl": ["3rem", "4.5rem"], // 48px
      "h-lg": ["2rem", "3rem"], // 32px
      "h-md": ["1.5rem", "2.25rem"], // 24px
      "h-sm": ["1.25rem", "1.875rem"], // 20px
      "b-xl": ["1.125rem", "2rem"], // 18px
      "b-lg": ["1rem", "1.75rem"], // 16px
      "b-md": ["0.875rem", "1.5rem"], // 14px
      "b-sm": ["0.75rem", "1.3rem"], // 12px
    },
  },
  plugins: [],
}
