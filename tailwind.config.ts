import flowbite from "flowbite/plugin";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/lib/**/*.js",
  ],

  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: {
          light: "#FFC424", 
          DEFAULT: "#FFAA00",
          dark: "#FF8800",
        },
        secondary: {
          light: "#F3F4F6",
          DEFAULT: "#E5E7EB",
          dark: "#D1D5DB",
        },
        background: {
          light: "#FFFFFF",
          dark: "#1F2937",
        },
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [flowbite],
};
export default config;
