import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || 'https://absolute-naomi-ahmedbahget-b6d6f38f.koyeb.app',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
