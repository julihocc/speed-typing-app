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
        "text-yellow-500",
        "bg-yellow-500",
        "text-green-500",
        "bg-green-500",
        "text-blue-500",
        "bg-blue-500",
        "text-indigo-500",
        "bg-indigo-500",
        "text-purple-500",
        "bg-purple-500",
        "text-pink-500",
        "bg-pink-500",
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
      colors: {
        primary: "#FF6363",
        secondary: {
          100: "#E2E2D5",
          200: "#888883",
        },
      },
      fontFamily: {
        body: ["Courier Prime", "monospace"],
      },
    },
  },
  plugins: [],
};
