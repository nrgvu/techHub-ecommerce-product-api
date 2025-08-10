import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { Routes } from 'react-router-dom'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    open: true, 
    port: 3000
  }
})

