import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        // changeOrigin:true
      },
    },
  },
  build: {
    outDir: "dist",
    output: {
      manualChunks: {
        react: ["react", "react-dom"],
        lucide: ["lucide-react"],
        firebase: ["firebase/app", "firebase/firestore", "firebase/auth"],
      },
    },
  },
});


