/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parasGrey: "#171D2D",
        blueButton: "#247DFE",
        redButton: "#EB5757",
        greenButton: "#21A79F",
        borderGray: "#272E3E",
        blueGray: "#35405E",
        bossanova: "#412150",
        sunglo: "#EA6C6F",
        test: " #99CC66",
        barossaDark: "#440F32",
      },
    },
  },

  plugins: [],
};
