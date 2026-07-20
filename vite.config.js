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
        outDir: 'docs',  // Change from 'dist' to 'docs'
        sourcemap: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                    'mui-vendor': ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
                },
            },
        },
    },
});
