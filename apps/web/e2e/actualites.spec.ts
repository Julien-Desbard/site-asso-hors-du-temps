import { test, expect } from '@playwright/test';

// Titres/slug issus du seed Payload (apps/web/src/seed/seed.ts), exécuté contre
// l'instance Payload utilisée par ces tests.
const SEED_TITRES = [
  'Aidez-nous à racheter la maison !',
  'Lettre aux adhérents — Avril 2026',
];
const SEED_SLUG = 'aidez-nous-a-racheter-la-maison';

test.describe('Actualités — contenu seedé (Payload)', () => {
  test('affiche les articles seedés sur la page listing', async ({ page }) => {
    await page.goto('/actualites');
    for (const titre of SEED_TITRES) {
      await expect(page.getByText(titre)).toBeVisible();
    }
  });

  test('le premier lien Lire la suite pointe vers le bon slug', async ({ page }) => {
    await page.goto('/actualites');
    const premierLien = page.getByRole('link', { name: 'Lire la suite' }).first();
    await expect(premierLien).toHaveAttribute('href', `/actualites/${SEED_SLUG}`);
  });

  test('page détail article accessible (pas de 404)', async ({ page }) => {
    const response = await page.goto(`/actualites/${SEED_SLUG}`);
    expect(response?.status()).not.toBe(404);
    await expect(page.locator('h1')).toContainText('maison', { ignoreCase: true });
  });
});
