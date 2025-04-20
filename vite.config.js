import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

<<<<<<< HEAD
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
=======
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/', // 👈 update this!
  build: {
    chunkSizeWarningLimit: 1000
  }
>>>>>>> 96a6540f6a47e6ebd3bcc701ddd652d5a06ed92a
})
