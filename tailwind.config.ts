import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#d20600",
          cream: "#f8ebcb",
          darkred: "#6e0300",
        },
      },
      fontFamily: {
        mono: ["var(--font-geist-mono)", "monospace"],
        heading: ["var(--font-jaro)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

