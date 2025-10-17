import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/CarreraUnion2025/' : '/', // ✅  }
})