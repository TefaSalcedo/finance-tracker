// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // base:'/TimerStudy/',
  server: {
    proxy: {
      '/api': {
        target: 'https://script.google.com/macros/s/AKfycbxxT_DeTnt-IcUi78NCVGdnp0NRcbB-ixs7CRRn4VegQ38_0QQ4s_rIT_7XaNzJZWX0nw/exec',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});