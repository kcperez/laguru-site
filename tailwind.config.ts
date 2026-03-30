import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0a",
        "bg-card": "#111111",
        "bg-card-alt": "#161616",
        "text-primary": "#e8e8e8",
        "text-dim": "#888888",
        "text-bright": "#ffffff",
        accent: "#c0c0c0",
        border: "#222222",
        "border-light": "#2a2a2a",
      },
      fontFamily: {
        body: ["var(--font-body)"],
        display: ["var(--font-display)"],
      },
    },
  },
  plugins: [],
};
export default config;
