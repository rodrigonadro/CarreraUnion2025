// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Detecta si estamos en producción (para GitHub Pages) o en desarrollo (localhost)
const isProd = process.env.NODE_ENV === 'production'

export default defineConfig({
  plugins: [react()],
  base: isProd ? '/CarreraUnion2025/' : '/', // 👈 ajusta base path dinámicamente
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
