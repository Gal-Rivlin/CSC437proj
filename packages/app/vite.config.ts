// packages/app/vite.config.ts
import { defineConfig } from "vite";

export default defineConfig({
  // build part is optional for dev; this is enough:
  server: {
    proxy: {
      "/api": "http://localhost:3000",
      "/auth": "http://localhost:3000",
    },
  },
});
