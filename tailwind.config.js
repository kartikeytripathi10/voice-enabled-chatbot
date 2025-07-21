/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ scans all components/pages
  ],
  darkMode: "class", // ✅ enables dark mode via 'dark' class
  theme: {
    extend: {
      animation: {
        gradientFlow: "gradientFlow 15s ease infinite", // optional, if you want named animation
      },
      keyframes: {
        gradientFlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
    },
  },
  plugins: [],
};
