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
      'bg-secondary': '#E6E6E6',
      'bg-primary-dark': '#000000',
      'bg-secondary-dark': '#737373',
      'font-primary': '#000000',
      'font-secondary': '#5C6165',
      'font-primary-dark': '#FFFFFF',
      'white': '#FFFFFF',
      'black': '#000000'
    },
    extend: {
      transitionProperty: {
        'width': 'width'
    },
    },
  },
  plugins: [],
}
