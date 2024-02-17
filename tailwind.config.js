/** @type {import('tailwindcss').Config} */

const config = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  darkMode: ["class"],
  variants: ["dark"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    function ({ addUtilities }) {
      const utilities = {
        ".dark-background": {
          backgroundColor: "#070C18",
        },
      };
      addUtilities(utilities, ["responsive", "hover", "dark"]);
    },
  ],
};
export default config;
