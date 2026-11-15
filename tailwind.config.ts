import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: { colors: { scrapbook: "var(--accent)", "scrapbook-ink": "#57474d" } } },
  plugins: [],
};

export default config;
