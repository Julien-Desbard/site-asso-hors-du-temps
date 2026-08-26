import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { sendContact } from '@/app/actions/sendContact';
import type { ContactFormData } from '@/app/actions/sendContact';

const validData: ContactFormData = {
  prenom: 'Marie',
  nom: 'Dupont',
  email: 'marie@example.com',
  message: 'Bonjour, je souhaite en savoir plus sur votre association.',
  startedAt: Date.now() - 5000,
};

describe('sendContact — validation Zod', () => {
  it('rejette un prénom vide', async () => {
    const result = await sendContact({ ...validData, prenom: '' });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toBe('Prénom requis');
  });

  it('rejette un nom vide', async () => {
    const result = await sendContact({ ...validData, nom: '' });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toBe('Nom requis');
  });

  it('rejette un email invalide', async () => {
    const result = await sendContact({ ...validData, email: 'pas-un-email' });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toBe('Adresse e-mail invalide');
  });

  it('rejette un message trop court (< 10 chars)', async () => {
    const result = await sendContact({ ...validData, message: 'Court' });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toContain('Message trop court');
  });
});

describe('sendContact — anti-abus', () => {
  it('honeypot rempli : succès silencieux, aucun envoi', async () => {
    const result = await sendContact({ ...validData, site_web: 'https://spam.example' });
    expect(result.ok).toBe(true);
  });

  it('soumission trop rapide (< 2s) : succès silencieux, aucun envoi', async () => {
    const result = await sendContact({ ...validData, startedAt: Date.now() });
    expect(result.ok).toBe(true);
  });
});

describe('sendContact — guard RESEND_API_KEY', () => {
  const originalKey = process.env.RESEND_API_KEY;

  beforeEach(() => {
    delete process.env.RESEND_API_KEY;
  });

  afterEach(() => {
    if (originalKey !== undefined) {
      process.env.RESEND_API_KEY = originalKey;
    }
  });

  it('retourne une erreur si RESEND_API_KEY est absent', async () => {
    const result = await sendContact(validData);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toBe('Service email non configuré.');
  });

  it('données valides passent Zod avant le guard API key', async () => {
    // Si on arrive au guard, la validation Zod est passée
    const result = await sendContact(validData);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toBe('Service email non configuré.');
  });
});
