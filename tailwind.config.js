/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        "black":"#22223b",
        "white":"#f8f9fa"
      },
      boxShadow:{
        "box":"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
      }
    },
  },
  plugins: [],
}

