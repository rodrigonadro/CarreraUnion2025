import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, 'cert/key.pem')),
    //   cert: fs.readFileSync(path.resolve(__dirname, 'cert/cert.pem')),
    // },
    port: 5173,
    // Agregamos todos los hosts que quieres usar
    host: ['localhost', 'vite.farmatodo.com.mx', 'farmatodo.com.mx', 'carrera.farmatodo.com.mx'],
  },
})