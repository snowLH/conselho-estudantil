import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        civic: {
          950: "#070E18",
          900: "#0B192C",
          850: "#0F2038",
          800: "#132743",
          700: "#1E3E62",
          600: "#2B527E",
          500: "#3B82F6",
          400: "#60A5FA",
          300: "#93C5FD",
          200: "#BFDBFE",
          100: "#DBEAFE",
          50: "#EFF6FF",
        },
        gold: {
          700: "#92400E",
          600: "#B45309",
          500: "#C59B27",
          400: "#D4AF37",
          300: "#F59E0B",
          200: "#FDE68A",
          100: "#FEF3C7",
          50: "#FFFBEB",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-merriweather)", "Georgia", "serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)",
        elevated: "0 10px 25px -5px rgba(11, 25, 44, 0.08), 0 8px 10px -6px rgba(11, 25, 44, 0.04)",
        institutional: "0 20px 35px -10px rgba(11, 25, 44, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
} satisfies Config;