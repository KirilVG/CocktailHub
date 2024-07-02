import path from "node:path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import EnvironmentPlugin from 'vite-plugin-environment'
 
export default defineConfig({
  plugins: [react(), EnvironmentPlugin(['VITE_GYC_API_URL'])],
  build: {
    outDir: 'dist/public',
    rollupOptions: {
      external: ['server'],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./app/src"),
      "@@": path.resolve(__dirname, "./shared"),
    },
  },
  server: {
    host: '0.0.0.0',
  },
})