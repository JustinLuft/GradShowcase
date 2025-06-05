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
        border: "#2a2a2a",
        input: "#1e1e1e",
        ring: "#ffc107",
        background: "#121212",
        foreground: "#f5f5f5",
        primary: {
          DEFAULT: "#d32f2f",
          foreground: "#f5f5f5",
          hover: "#e53935"
        },
        secondary: {
          DEFAULT: "#1e1e1e",
          foreground: "#f5f5f5",
        },
        accent: {
          DEFAULT: "#ffc107",
          foreground: "#121212",
        },
        destructive: {
          DEFAULT: "#dc2626",
          foreground: "#f5f5f5",
        },
        muted: {
          DEFAULT: "#2a2a2a",
          foreground: "#a1a1a1",
        },
        popover: {
          DEFAULT: "#1e1e1e",
          foreground: "#f5f5f5",
        },
        card: {
          DEFAULT: "#1e1e1e",
          foreground: "#f5f5f5",
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
