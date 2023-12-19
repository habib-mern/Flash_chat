/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'nunito': ['Nunito Sans', 'sans-serif'],
    },
    extend: {
      colors: {
        'primary': '#6AC6EF',
        'secound': '#ED1278',
      },
    },
  },
  plugins: [],
}

