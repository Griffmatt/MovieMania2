/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      'xs': {'max': '425px'},
      'sm': '426px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    colors: {
      'primary': 'tomato',
      'secondary': '#34568B',
      'bg-primary': '#FFFFFF',
      'bg-secondary': '#F5F3EF',
      'bg-primary-dark': '#000000',
      'bg-secondary-dark': '#2D2F32',
      'font-primary': '#000000',
      'font-secondary': '#5C6165',
      'font-primary-dark': '#FFFFFF',
      'white': '#FFFFFF',
      'black': '#000000'
    },
    extend: {
      transitionProperty: {
        'width': 'width',
        'height': 'height'
    },
    },
  },
  plugins: [],
}
