import { test, expect } from '@playwright/test';

const FALLBACK_TITRES = [
  'Aidez-nous à racheter la maison !',
  'Lettre aux adhérents — Avril 2026',
];
const FALLBACK_SLUG = 'aidez-nous-a-racheter-la-maison';

test.describe('Actualités — mode fallback (Strapi absent)', () => {
  test('affiche les articles de fallback sur la page listing', async ({ page }) => {
    await page.goto('/actualites');
    for (const titre of FALLBACK_TITRES) {
      await expect(page.getByText(titre)).toBeVisible();
    }
  });

  test('le premier lien Lire la suite pointe vers le bon slug', async ({ page }) => {
    await page.goto('/actualites');
    const premierLien = page.getByRole('link', { name: 'Lire la suite' }).first();
    await expect(premierLien).toHaveAttribute('href', `/actualites/${FALLBACK_SLUG}`);
  });

  test('page détail article fallback accessible (pas de 404)', async ({ page }) => {
    const response = await page.goto(`/actualites/${FALLBACK_SLUG}`);
    expect(response?.status()).not.toBe(404);
    await expect(page.locator('h1')).toContainText('maison', { ignoreCase: true });
  });
});
