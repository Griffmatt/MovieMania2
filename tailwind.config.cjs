/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      'sm': {'max': '640px'},
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    colors: {
      'primary': 'tomato',
      'secondary': '#34568B',
      'bg-primary': '#FFFFFF',
      'bg-secondary': '#EFF3F4',
      'bg-primary-dark': '#000000',
      'bg-secondary-dark': '#16181C',
      'font-primary': '#000000',
      'font-secondary': '#5C6165',
      'font-primary-dark': '#FFFFFF',
      'white': '#FFFFFF',
      'black': '#000000'
    },
    extend: {},
  },
  plugins: [],
}
