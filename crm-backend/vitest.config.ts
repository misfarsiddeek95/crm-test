import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    // Enable Jest-compatible globals (describe, it, expect, etc.)
    globals: true,
    environment: 'node',
    // Look for test files in the 'src' directory
    include: ['src/**/*.spec.ts'],
    // Coverage provider
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        'src/main.ts',
        'src/prisma/', // Exclude generated Prisma client
      ],
    },
  },
});
