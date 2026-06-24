import { test, expect } from '@playwright/test';

test.describe('Formulaire de contact — validation client', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/nous-contacter');
    await page.waitForSelector('form');
  });

  test('soumission vide — affiche toutes les erreurs requises', async ({ page }) => {
    await page.click('button[type="submit"]');
    await expect(page.getByText('Prénom requis')).toBeVisible();
    await expect(page.getByText('Nom requis', { exact: true })).toBeVisible();
    await expect(page.getByText('Adresse e-mail invalide')).toBeVisible();
    await expect(page.getByText('Message trop court')).toBeVisible();
  });

  test('email invalide — affiche l\'erreur email', async ({ page }) => {
    await page.fill('#email', 'pas-un-email');
    await page.click('button[type="submit"]');
    await expect(page.getByText('Adresse e-mail invalide')).toBeVisible();
  });

  test('message < 10 chars — affiche l\'erreur message', async ({ page }) => {
    await page.fill('#prenom', 'Marie');
    await page.fill('#nom', 'Dupont');
    await page.fill('#email', 'marie@example.com');
    await page.fill('#message', 'Court');
    await page.click('button[type="submit"]');
    await expect(page.getByText('Message trop court')).toBeVisible();
  });

  test('formulaire valide — bouton Envoyer est actif', async ({ page }) => {
    await page.fill('#prenom', 'Marie');
    await page.fill('#nom', 'Dupont');
    await page.fill('#email', 'marie@example.com');
    await page.fill('#message', 'Bonjour, je souhaite en savoir plus sur votre association.');
    // Ne pas soumettre — Resend absent en CI
    await expect(page.locator('button[type="submit"]')).toBeEnabled();
  });
});
