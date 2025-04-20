import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export  default defineConfig({
  base: '/treasure-hunt/', // 👈 update this!
  plugins: [react()],
})
