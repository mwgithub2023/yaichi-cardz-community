import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  optimizeDeps: {
    include: ["react", "react-dom/client", "motion/react"],
  },
  plugins: [react(), tailwindcss()],
  server: {
    warmup: {
      clientFiles: ["./src/main.tsx"],
    },
  },
});
