import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        paper: "var(--paper)",
        ink: "var(--ink)",
        deep: "var(--deep)",
        muted: "var(--muted)",
        surface: "var(--surface)",
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
        stone: "var(--stone)",
        soft: "var(--soft)",
        rust: "var(--rust)",
        "rust-hover": "var(--rust-hover)",
        amber: "var(--rust-light)",
        accent: "var(--accent)",
        "green-ok": "var(--green-ok)",
      },
      fontFamily: {
        display: ["var(--font-body)", "Inter", "sans-serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
        sans: ["var(--font-body)", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        widest: ".12em",
        wider: ".08em",
      },
      borderColor: {
        DEFAULT: "var(--line)",
      },
    },
  },
  plugins: [],
};

export default config;
