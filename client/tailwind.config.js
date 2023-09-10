/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        myBrown: "#4C3D3D",
        myGold: "#CB9247",
      },
      fontFamily: {
        grotesk: ["Space Grotesk", "sans-serif"],
        openSans: ["Open Sans", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [],
};
