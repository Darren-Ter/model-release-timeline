import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/model-timeline/',
  build: { outDir: 'dist/model-timeline' },
  plugins: [react()],
  test: {
    environment: 'node',
  },
});
