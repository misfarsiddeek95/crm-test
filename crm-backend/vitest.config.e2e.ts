import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'node',
    // Look for e2e-spec files in the 'test' directory
    include: ['test/**/*.e2e-spec.ts'],
    // Set a longer timeout for E2E tests
    testTimeout: 30000,
  },
});
