/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{html,js}"],
  theme: {
    screens: {
      lg: { max: "1199.99px" },
      md: { max: "991.99px" },
      sm: { max: "767.99px" },
      xs: { max: "479.99px" },
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      backgroundImage: {
        heroGradient:
          "linear-gradient(135deg, #053b2d 0%, #064e3b 25%, #065f46 55%, #047857 80%, #059669 100%)",
      },
      colors: {
        blueviolet: "#077a8c",
        lightgray: "#666768",
      },
      keyframes: {
        "fade-in": {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
      },
      animation: {
        fadeIn: ".8s fade-in ease-in-out",
      },

      gridTemplateColumns: {
        "auto-fill-minmax": "repeat(auto-fit, minmax(250px, 1fr))",
      },
    },
  },
  plugins: [],
};
