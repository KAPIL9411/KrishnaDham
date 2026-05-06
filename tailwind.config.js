/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: '#E8651A',
        ivory: '#FAF6EF',
        gold: '#C9A84C',
        charcoal: '#1A1A2E',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Noto Sans Devanagari', 'serif'],
        body: ['DM Sans', 'Noto Sans Devanagari', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
