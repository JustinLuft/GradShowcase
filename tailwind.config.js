import type { Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"

const config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "#e2e8f0", // light gray border
        input: "#f8fafc",  // very light gray input background
        ring: "#2563eb",   // blue ring for focus
        background: "#ffffff", // white background
        foreground: "#1e293b", // dark slate for text
        primary: {
          DEFAULT: "#1a237e",      // darker, greyish blue
          foreground: "#ffffff",   // white text on blue
          hover: "#283593",        // slightly lighter for hover
        },
        secondary: {
          DEFAULT: "#10b981",      // green accent (used for highlights, badges)
          foreground: "#ffffff",   // white text on green
          hover: "#059669",        // darker green for hover
        },
        accent: {
          DEFAULT: "#38bdf8",      // sky blue accent (for highlights)
          foreground: "#1e293b",   // dark text on blue
        },
        section: {
          DEFAULT: "#334155",      // dark blue-grey for section backgrounds
          foreground: "#f1f5f9",   // light text on section
        },
        muted: {
          DEFAULT: "#f1f5f9",      // very light gray for muted backgrounds
          foreground: "#64748b",   // muted slate for text
        },
        popover: {
          DEFAULT: "#f8fafc",      // very light gray for popovers
          foreground: "#1e293b",
        },
        card: {
          DEFAULT: "#f8fafc",      // very light gray for cards
          foreground: "#1e293b",
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
        serif: ["Cinzel", ...fontFamily.serif],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config

export default config
