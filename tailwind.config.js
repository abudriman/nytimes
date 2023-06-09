/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    // "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-dark': '#1C1B22'
      },
      keyframes: {
        'slide-up': {
          '0%' :{transform: 'translateY(100%)'},
          '100%': {transform: 'translateY(0%)'}
        },
      },
      animation: {
        'slide-up': 'slide-up .3s ease-in-out forwards',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}