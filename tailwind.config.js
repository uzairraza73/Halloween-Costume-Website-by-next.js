/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#0B0910",
        surface: "#15101D",
        pumpkin: "#FF7518",
        spectral: "#8B5CF6",
        slime: "#B8F34A",
        muted: "#B8B2C4",
        "card-border": "#2A1F3D",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Bebas Neue", "Inter", "sans-serif"],
      },
      backgroundImage: {
        "glow-pumpkin":
          "radial-gradient(ellipse at center, rgba(255,117,24,0.15) 0%, transparent 70%)",
        "glow-spectral":
          "radial-gradient(ellipse at center, rgba(139,92,246,0.15) 0%, transparent 70%)",
        "hero-gradient":
          "linear-gradient(135deg, #0B0910 0%, #1a0a2e 50%, #0B0910 100%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        ticker: "ticker 30s linear infinite",
        wiggle: "wiggle 0.3s ease-in-out",
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255,117,24,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(255,117,24,0.6)" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-5deg)" },
          "75%": { transform: "rotate(5deg)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      dropShadow: {
        pumpkin: "0 0 15px rgba(255,117,24,0.4)",
        spectral: "0 0 15px rgba(139,92,246,0.4)",
        slime: "0 0 10px rgba(184,243,74,0.4)",
      },
    },
  },
  plugins: [],
};
