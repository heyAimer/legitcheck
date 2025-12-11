/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    // Add more paths if you have other folders
  ],
  css: ["./src/app/globals.css"],
  theme: {
    extend: {},
  },
  plugins: [],
};