import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://n8n.commcal.in/webhook',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/api/payment-verification': {
        target: 'https://n8n.commcal.in/webhook/payment-verification',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/payment-verification/, ''),
      },
    },
  },
});