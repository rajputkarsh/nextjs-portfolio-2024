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
      textColor: ["hover"],
      colors: {
        "theme-color": "#e3405f",
      },
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
  safelist: [
    "hover:bg-purple-600",
    "hover:bg-red-500",
    "hover:bg-green-500",
    "hover:bg-yellow-600",
    "hover:bg-emerald-700",
    "hover:bg-slate-600",
    "hover:text-white",
  ],
};
export default config;
