import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://week7-cm3-d7o4.onrender.com',
        changeOrigin: true,
      },
    }
  },
})
