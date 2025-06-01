// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // base:'/TimerStudy/',
  server: {
    proxy: {
      '/api': {
        target: 'https://script.google.com/macros/s/AKfycby63ofUnFuIu33P9zioL38zwmwUL3SwQh9kX5WjzkME9SsyPUTxOLnTHSRm4zGs37Lxvg/exec',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});