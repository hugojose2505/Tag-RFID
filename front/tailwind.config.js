/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'background': "url('/src/assets/bg_login.png')",
      },
      backgroundColor: {
        'back2': '#F5F5F5',
      }
    },
  },
  plugins: [],
}


