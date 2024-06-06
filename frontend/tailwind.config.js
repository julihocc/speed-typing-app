/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important: "#root",
  purge: {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    options: {
      safelist: [
        "text-red-500",
        "bg-red-500",
        "text-green-500",
        "bg-green-500",
      ],
    },
  },
  theme: {
    extend: {
      colors: {
        primary: "#6441a5",
        secondary: "#00ff7f",
        tertiary: "#ff00ff",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Courier Prime", "monospace"],
      },
    },
  },
  plugins: [],
};
