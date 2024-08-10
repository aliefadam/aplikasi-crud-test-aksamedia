/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0F044C",
        "primary-light": "#0f044c7b",
        "primary-hover": "#0b0338",
        secondary: "#141E61",
        tertiary: "#787A91",
        quarternary: "#EEEEEE",
      },
    },
  },
  plugins: [],
};
