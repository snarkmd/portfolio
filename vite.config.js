import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  css: {
    postcss: "./postcss.config.js",
  },
  plugins: [react()],
});
