/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        raymond: {
          red: "#C8102E",
          darkRed: "#A50D26",
          navy: "#172033",
          lightNavy: "#1F2A40",
          gray: "#64748B",
          light: "#F8FAFC",
        },
      },

      boxShadow: {
        soft: "0 8px 30px rgba(15, 23, 42, 0.08)",
        card: "0 4px 20px rgba(15, 23, 42, 0.06)",
        red: "0 10px 25px rgba(200, 16, 46, 0.22)",
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },

  plugins: [],
};