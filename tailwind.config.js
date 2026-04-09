/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Fredoka", "sans-serif"],
        body: ["Nunito", "sans-serif"],
      },
      colors: {
        void: "#0F0F23",
        "void-light": "#161632",
        "void-card": "#1a1a3e",
        neon: {
          purple: "#7C3AED",
          violet: "#A78BFA",
          rose: "#F43F5E",
          pink: "#EC4899",
          cyan: "#06B6D4",
        },
        surface: {
          text: "#E2E8F0",
          muted: "#94A3B8",
          dim: "#64748B",
        },
      },
      boxShadow: {
        "neon-purple": "0 0 15px rgba(124,58,237,0.5), 0 0 45px rgba(124,58,237,0.2)",
        "neon-rose": "0 0 15px rgba(244,63,94,0.5), 0 0 45px rgba(244,63,94,0.2)",
        "neon-cyan": "0 0 15px rgba(6,182,212,0.5), 0 0 45px rgba(6,182,212,0.2)",
        "card-glow": "0 0 30px rgba(124,58,237,0.3), 0 0 60px rgba(124,58,237,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "scanline": "scanline 8s linear infinite",
        "shimmer": "shimmer 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
