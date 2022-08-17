/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  import: '#root',
  theme: {
    extend: {
      colors: {
        primary: '#000',
        secondary: '#fff',
        'input-border': '#888888',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
