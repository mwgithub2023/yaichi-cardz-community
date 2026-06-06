import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  // 整站挂在 app.cardz.game/yaichi/ 子路径下,所有构建资源带此前缀
  base: "/yaichi/",
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
