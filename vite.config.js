import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/tevanoxmovie-web/',
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React libraries
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          
          // MUI and styling
          'mui-vendor': [
            '@mui/material',
            '@mui/icons-material',
            '@emotion/react',
            '@emotion/styled',
          ],
          
          // State management
          'redux-vendor': ['react-redux', '@reduxjs/toolkit'],
          
          // Utilities
          'utils-vendor': ['axios', 'react-toastify', 'react-hook-form', 'yup'],
        },
      },
    },
  },
});