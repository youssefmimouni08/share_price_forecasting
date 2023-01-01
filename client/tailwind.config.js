/** @type {import('tailwindcss').Config}  */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./pages/forecast.js",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: [
        "Josefin Sans",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
    },
    extend: {
      colors: {
        "4650a1": "#4650a1",
        "4a5da9": "#4a5da9",
        "4f6ab1": "#4f6ab1",
        "5676b8": "#5676b8",
        "5f83bf": "#5f83bf",
        "2f2774": "#2f2774",
        "3a4a91": "#3a4a91",
        "4c6cab": "#4c6cab",
        "668ec3": "#668ec3",
        "87b1d9": "#87b1d9",
      },
    },
  },
  plugins: [],
};
