/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "serif"],
        poppins: ["Poppins", "serif"],
        inter: ["Inter", "serif"],
        karla: ["Karla", "serif"],
        quicksand: ["Quicksand", "serif"]
      },
      colors: {
        background: "#242424",
        border: "#454545",
      },
    },
  },
  plugins: [],
};