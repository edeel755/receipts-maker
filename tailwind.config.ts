import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "Inter", "Arial", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "monospace"]
      },
      colors: {
        brand: {
          50: "#eef8ff",
          100: "#d9eeff",
          200: "#baddff",
          300: "#86c4ff",
          400: "#4aa2ff",
          500: "#1d7dff",
          600: "#0f5df7",
          700: "#1147dd",
          800: "#153db3",
          900: "#18388d",
          950: "#0f2256"
        }
      },
      boxShadow: {
        soft: "0 1px 2px rgba(0,0,0,.06), 0 10px 30px rgba(0,0,0,.06)"
      }
    }
  },
  plugins: [typography]
} satisfies Config;

