/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#071327",
        green: "#BFCF59",
        light: "#E7E7D6",
        red: "#ED6656",
      },
    },
  },
  plugins: [],
};
