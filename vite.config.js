import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    fs: {
      strict: false
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  optimizeDeps: {
    include: ['tailwindcss']
  },
  plugins: [react()],
})
