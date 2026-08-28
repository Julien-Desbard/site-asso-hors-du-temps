import { test, expect } from '@playwright/test';

const PUBLIC_PAGES = [
  { path: '/', heading: 'Les actualités', selector: 'h2' },  // home n'a pas de h1
  { path: '/qui-sommes-nous', heading: 'Qui sommes-nous', selector: 'h1' },
  { path: '/etre-accueilli', heading: 'accueilli', selector: 'h1' },
  { path: '/benevolat', heading: 'Donner de son temps', selector: 'h1' },
  { path: '/actualites', heading: 'Actualités', selector: 'h1' },
  { path: '/nous-contacter', heading: 'Nous contacter', selector: 'h1' },
  { path: '/fonds-de-dotation', heading: 'maison', selector: 'h1' },
];

test.describe('Navigation — pages publiques', () => {
  for (const { path, heading, selector } of PUBLIC_PAGES) {
    test(`${path} — accessible et heading visible`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).not.toBe(404);
      expect(response?.status()).not.toBe(500);
      const headingEl = page.locator(selector).first();
      await expect(headingEl).toBeVisible();
      await expect(headingEl).toContainText(heading, { ignoreCase: true });
    });
  }
});
