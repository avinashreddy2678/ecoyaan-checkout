/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx,css}",
    "./components/**/*.{ts,tsx,js,jsx,css}",
    // include global stylesheet so used utilities inside it (e.g. @apply) are recognized
    "./app/globals.css",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
