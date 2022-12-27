/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'regal-blue': '#453C67',
        'hover-blue': '#6D67E4',
      },
    },
  },
  plugins: [],
}
