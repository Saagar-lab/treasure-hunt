import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/', // 👈 update this!
  build: {
    chunkSizeWarningLimit: 1000
  }
})
