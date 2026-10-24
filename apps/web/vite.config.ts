import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// The web app: React 18 built by Vite. In development (`npm run dev`) the dev
// server proxies /api to the API on port 3000, so the browser sees one origin
// and no CORS is needed (NFR1.15).
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@mojud/contracts": fileURLToPath(
        new URL("../../packages/contracts/src/index.ts", import.meta.url),
      ),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      "/api": { target: "http://localhost:3000", changeOrigin: false },
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
  },
});
