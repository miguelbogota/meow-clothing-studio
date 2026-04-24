import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test-setup.ts'],
    include: ['**/*.{test,spec}.{js,ts,tsx}'],
    exclude: ['node_modules', 'dist', '.next', '**/node_modules/**'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './apps/marketplace'),
      '@/checkout': resolve(__dirname, './apps/checkout'),
    },
  },
});
