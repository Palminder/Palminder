import { defineConfig, devices } from '@playwright/test';

/**
 * Smoke, accessibility and print tests run against the production build in `dist/`,
 * served with the Cloudflare `_headers` rules applied (see scripts/serve-dist.mjs), so the
 * Content Security Policy is exercised exactly as it will be in production.
 *
 * Run `npm run build` first; `npm test` starts the server itself.
 */
const PORT = Number(process.env.PORT ?? 4321);
const baseURL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: './tests',
  timeout: 45_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : [['list']],
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1366, height: 768 } },
    },
    {
      name: 'mobile',
      use: { ...devices['Pixel 7'] },
      testIgnore: /print\.spec\.ts/,
    },
  ],
  webServer: {
    command: 'node scripts/serve-dist.mjs',
    url: `${baseURL}/`,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
    env: { PORT: String(PORT) },
  },
});
