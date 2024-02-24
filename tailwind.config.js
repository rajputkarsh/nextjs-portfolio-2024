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
        "brown-50": "#efebe9",
        "brown-100": "#d7ccc8",
        "brown-200": "#bcaaa4",
        "deep-orange-400": "#ff7043",
        "orange-50": "#fff3e0",
        "orange-300": "#ffb74d",
        "grey-700": "#616161",
        "grey-800": "#645B52",
        "red-500": "#f44336",
        "red-700": "#d32f2f",
        "yellow-100": "#fff9c4",
        "yellow-400": "#ffee58",
        "yellow-500": "#ffeb3b",
        "yellow-600": "#fdd835",
        "yellow-700": "#fbc02d",
        "yellow-800": "#f9a825",
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
    "bg-brown-100",
    "bg-deep-orange-400",
    "bg-orange-50",
    "bg-orange-300",
    "bg-red-500",
    "bg-red-700",
    "bg-yellow-100",
    "bg-yellow-400",
    "bg-yellow-500",
    "bg-yellow-600",
    "bg-yellow-700",
    "bg-yellow-800",
    "text-brown-50",
    "text-grey-800",
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
