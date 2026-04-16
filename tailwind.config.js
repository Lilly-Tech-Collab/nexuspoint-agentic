/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: "#07080B",
          900: "#0B0D12",
          800: "#12141B",
          700: "#1A1D26",
          600: "#252934",
        },
        bone: {
          50:  "#F6F1E4",
          100: "#EDE6D4",
          200: "#D9CFB7",
          300: "#B6AA8B",
        },
        ember: {
          400: "#F4C478",
          500: "#E5A24A",
          600: "#C87E28",
          700: "#8A521A",
        },
        teal: {
          400: "#6BD5C5",
          500: "#2FB5A2",
          700: "#155D54",
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Geist"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "marquee": {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "ember-pulse": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up":     "fade-up 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both",
        "fade-in":     "fade-in 1.2s ease-out both",
        "marquee":     "marquee 40s linear infinite",
        "ember-pulse": "ember-pulse 3.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
