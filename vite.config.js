import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // Explicitly specify public directory
  publicDir: 'public',
  server: {
    port: 3000,
    open: true,
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // Ensure assets are copied properly
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
    sourcemap: true,
  },
  preview: {
    port: Number(process.env.PORT) || 3000,
    host: true,
    allowedHosts: ['portfolioweb-k020.onrender.com'], // Your Render hostname here
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react',
    ],
  },
});