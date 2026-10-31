import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configurable base path: Defaults to GitHub Pages subfolder, or root '/' when VITE_BASE_PATH is set
  base: process.env.VITE_BASE_PATH || '/Foundation-Website-Ver-0.0/',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
