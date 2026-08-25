import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    // En CI, la base a déjà reçu de vraies migrations (ci:setup-db) ; `next dev`
    // active par défaut le mode "push" de payload.config.ts (NODE_ENV=development),
    // ce qui entrerait en conflit avec les migrations déjà appliquées et déclenche
    // un prompt de confirmation interactif bloquant côté Payload.
    env: process.env.CI ? { PAYLOAD_DISABLE_PUSH: 'true' } : {},
  },
});
