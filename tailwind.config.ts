import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
        display: ["var(--font-syne)", "system-ui"],
      },
      colors: {
        surface: {
          base: "#080c12",
          card: "#0d1520",
          elevated: "#111927",
          border: "#0f1929",
          hover: "#0f1929",
          input: "#0a1422",
        },
        brand: {
          blue: "#38bdf8",
          purple: "#818cf8",
          green: "#34d399",
          amber: "#fbbf24",
          red: "#f87171",
          orange: "#fb923c",
        },
        text: {
          primary: "#f1f5f9",
          secondary: "#94a3b8",
          muted: "#4a5568",
          dim: "#334155",
          ghost: "#1e2d3d",
        },
      },
      animation: {
        "fade-up": "fadeUp 0.35s ease-out forwards",
        "pulse-slow": "pulseSlow 2s ease-in-out infinite",
        ping: "ping 1.8s ease-out infinite",
        "count-up": "countUp 0.4s ease-out",
        spin: "spin 0.7s linear infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulseSlow: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        countUp: {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        card: "0 0 0 1px rgba(255,255,255,0.03), 0 4px 24px rgba(0,0,0,0.5)",
        "glow-blue": "0 0 30px rgba(56,189,248,0.12)",
        "glow-green": "0 0 30px rgba(52,211,153,0.12)",
        "glow-red": "0 0 30px rgba(248,113,113,0.12)",
        "glow-purple": "0 0 30px rgba(129,140,248,0.12)",
        "glow-amber": "0 0 30px rgba(251,191,36,0.12)",
        "glow-orange": "0 0 30px rgba(251,146,60,0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
