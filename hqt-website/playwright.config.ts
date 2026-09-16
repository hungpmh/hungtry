import { defineConfig, devices } from '@playwright/test'

/**
 * Smoke / accessibility suite for the HQT Group website.
 *
 * - Runs against the production build served by `vite preview` on a fixed port.
 *   The web server command builds first (`npm run build`) unless PW_SKIP_BUILD=1,
 *   so `npm test` is self-contained and always tests the current sources.
 * - Honours VITE_BASE_PATH (default "/") so the same suite can exercise a
 *   sub-path deployment: VITE_BASE_PATH=/hungtry/ npm test
 * - Uses the Chromium at PW_CHROMIUM_PATH when set (sandboxed environments),
 *   otherwise Playwright's own browser (CI: `npx playwright install --with-deps chromium`).
 */
const PORT = 4173
const rawBase = process.env.VITE_BASE_PATH || '/'
const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`
const baseURL = `http://localhost:${PORT}${base}`

const previewCommand = `npx vite preview --port ${PORT} --strictPort`
const command = process.env.PW_SKIP_BUILD ? previewCommand : `npm run build && ${previewCommand}`

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  use: {
    baseURL,
    ...devices['Desktop Chrome'],
    locale: 'en-US',
    colorScheme: 'light',
    trace: 'retain-on-failure',
    launchOptions: {
      executablePath: process.env.PW_CHROMIUM_PATH || undefined,
    },
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: { VITE_BASE_PATH: base },
  },
})
