import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: "#FFD700",
        "page-bg": "#0a0a0a",
        card: "#111111",
        elevated: "#1a1a1a",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      letterSpacing: {
        tight: "-0.03em",
      },
      borderRadius: {
        card: "12px",
      },
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.5), 0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)",
        elevated: "0 4px 16px rgba(255,215,0,0.1), 0 16px 48px rgba(0,0,0,0.6)",
        glow: "0 0 24px rgba(245,192,17,0.35), 0 4px 12px rgba(245,192,17,0.2)",
        "glow-lg": "0 0 48px rgba(245,192,17,0.4), 0 8px 24px rgba(245,192,17,0.25)",
      },
      animation: {
        "fade-up": "fadeUp 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards",
        "fade-in": "fadeIn 0.3s ease forwards",
        "scroll-x": "scrollX 40s linear infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        scrollX: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
