/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'background': "url('/assets/bg_login.png')",
      }
    },
  },
  plugins: [],
}


