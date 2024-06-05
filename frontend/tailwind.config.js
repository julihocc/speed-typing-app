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
        // Add more combinations as needed
      ],
    },
  },
  theme: {
    extend: {
      width: {
        custom: "calc(100% - 2rem)",
        // custom: 400,
      },

      fontFamily: {
        body: ["Courier Prime", "monospace"],
      },
    },
  },
  plugins: [],
};
