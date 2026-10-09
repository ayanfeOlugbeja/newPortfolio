/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        labilGrotesk: ['Labil Grotesk', 'sans-serif'],
        lemonMilk: ['Lemon Milk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
