import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    server: {
      port: parseInt(env.PORT) || 5173,
      host: true, // Expose to network
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});