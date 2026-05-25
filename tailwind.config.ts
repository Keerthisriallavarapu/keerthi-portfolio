import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f8f9fa",
          100: "#e9ecef",
          200: "#dee2e6",
          900: "#1a1a2e",
          950: "#0a0a18",
        },
        accent: {
          400: "#5b8def",
          500: "#3b82f6",
          600: "#2563eb",
        },
      },
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      animation: {
        "blink": "blink 1s steps(2) infinite",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "glow": "glow 2s ease-in-out infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(91, 141, 239, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(91, 141, 239, 0.6)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
