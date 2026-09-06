import { describe, it, expect, vi, beforeEach } from 'vitest';

// `vi.mock` est hoisté au-dessus des imports : les mocks partagés avec la factory
// doivent être créés par `vi.hoisted()`, sinon ils sont encore `undefined` à l'appel.
const { envoiMock, constructeurMock } = vi.hoisted(() => ({
  envoiMock: vi.fn(),
  constructeurMock: vi.fn(),
}));

// `new Resend(apiKey)` est construit *dans* la fonction testée : on ne peut pas
// remplacer une instance, on remplace la classe entière.
vi.mock('resend', () => ({
  Resend: class {
    emails = { send: envoiMock };
    constructor(cle: string) {
      constructeurMock(cle);
    }
  },
}));

import { sendContact, type ContactFormData } from './sendContact';

const donneesValides: ContactFormData = {
  prenom: 'Marie',
  nom: 'Dupont',
  email: 'marie@example.com',
  message: 'Bonjour, je souhaite en savoir plus sur votre association.',
  startedAt: Date.now() - 5000,
};

beforeEach(() => {
  // Résolution par défaut : la forme réelle du SDK Resend v6.
  envoiMock.mockResolvedValue({ data: { id: 'msg_1' }, error: null });
  vi.stubEnv('RESEND_API_KEY', 'cle-de-test');
});

describe('sendContact — validation Zod', () => {
  it('rejette un prénom vide', async () => {
    const resultat = await sendContact({ ...donneesValides, prenom: '' });
    expect(resultat).toEqual({ ok: false, error: 'Prénom requis' });
    expect(envoiMock).not.toHaveBeenCalled();
  });

  it('rejette un nom vide', async () => {
    const resultat = await sendContact({ ...donneesValides, nom: '' });
    expect(resultat).toEqual({ ok: false, error: 'Nom requis' });
  });

  it('rejette un e-mail invalide', async () => {
    const resultat = await sendContact({ ...donneesValides, email: 'pas-un-email' });
    expect(resultat).toEqual({ ok: false, error: 'Adresse e-mail invalide' });
  });

  it('rejette un message trop court (< 10 caractères)', async () => {
    const resultat = await sendContact({ ...donneesValides, message: 'Court' });
    expect(resultat).toEqual({
      ok: false,
      error: 'Message trop court (10 caractères min.)',
    });
  });

  it('remonte la première erreur quand plusieurs champs sont invalides', async () => {
    const resultat = await sendContact({ ...donneesValides, prenom: '', nom: '' });
    expect(resultat).toEqual({ ok: false, error: 'Prénom requis' });
  });
});

describe('sendContact — anti-abus', () => {
  it('honeypot rempli : succès silencieux et aucun envoi', async () => {
    const resultat = await sendContact({
      ...donneesValides,
      site_web: 'https://spam.example',
    });
    expect(resultat).toEqual({ ok: true });
    // L'assertion qui manquait : le « succès » ne doit rien avoir envoyé.
    expect(envoiMock).not.toHaveBeenCalled();
  });

  it('soumission trop rapide (< 2 s) : succès silencieux et aucun envoi', async () => {
    const resultat = await sendContact({ ...donneesValides, startedAt: Date.now() });
    expect(resultat).toEqual({ ok: true });
    expect(envoiMock).not.toHaveBeenCalled();
  });

  it('accepte une soumission juste au-delà du délai minimum', async () => {
    await sendContact({ ...donneesValides, startedAt: Date.now() - 2001 });
    expect(envoiMock).toHaveBeenCalledTimes(2);
  });
});

describe('sendContact — garde RESEND_API_KEY', () => {
  it("retourne une erreur de configuration si la clé est absente", async () => {
    // `stubEnv(nom, undefined)` supprime réellement la variable ; `unstubEnvs: true`
    // (vitest.config.ts) la restaure après le test.
    vi.stubEnv('RESEND_API_KEY', undefined);

    const resultat = await sendContact(donneesValides);

    expect(resultat).toEqual({ ok: false, error: 'Service email non configuré.' });
    expect(constructeurMock).not.toHaveBeenCalled();
    expect(envoiMock).not.toHaveBeenCalled();
  });
});

describe('sendContact — chemin nominal', () => {
  it('construit le client Resend avec la clé de l’environnement', async () => {
    await sendContact(donneesValides);
    expect(constructeurMock).toHaveBeenCalledWith('cle-de-test');
  });

  it('envoie la notification puis l’accusé de réception, avec les payloads exacts', async () => {
    vi.stubEnv('CONTACT_EMAIL', 'destinataire@asso.test');
    vi.stubEnv('RESEND_FROM', 'expediteur@asso.test');

    const resultat = await sendContact({
      ...donneesValides,
      tel: '0601020304',
      sujet: 'Une question',
    });

    expect(resultat).toEqual({ ok: true });
    expect(envoiMock).toHaveBeenCalledTimes(2);

    expect(envoiMock).toHaveBeenNthCalledWith(1, {
      from: 'expediteur@asso.test',
      to: 'destinataire@asso.test',
      replyTo: 'marie@example.com',
      subject: 'Une question',
      text:
        'De : Marie Dupont <marie@example.com>\nTél : 0601020304\n\n' +
        'Bonjour, je souhaite en savoir plus sur votre association.',
    });

    expect(envoiMock).toHaveBeenNthCalledWith(2, {
      from: 'expediteur@asso.test',
      to: 'marie@example.com',
      subject: "Votre message à L'Hors du Temps",
      text:
        'Bonjour Marie,\n\n' +
        "Un grand merci de votre intérêt pour notre association, nous vous répondrons dès que possible ! Bien à vous. L'équipe de l'Hors du Temps.\n\n" +
        '---\nVotre message :\nBonjour, je souhaite en savoir plus sur votre association.',
    });
  });

  it('retombe sur les adresses et le sujet par défaut', async () => {
    vi.stubEnv('CONTACT_EMAIL', undefined);
    vi.stubEnv('RESEND_FROM', undefined);

    await sendContact(donneesValides);

    expect(envoiMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        from: 'contact@assohorsdutemps.fr',
        to: 'asso.horsdutemps@gmail.com',
        subject: 'Message de Marie Dupont',
      }),
    );
  });

  it('omet la ligne « Tél : » quand le téléphone n’est pas renseigné', async () => {
    await sendContact(donneesValides);

    const premierEnvoi = envoiMock.mock.calls[0][0];
    expect(premierEnvoi.text).not.toContain('Tél :');
    expect(premierEnvoi.text).toBe(
      'De : Marie Dupont <marie@example.com>\n\n' +
        'Bonjour, je souhaite en savoir plus sur votre association.',
    );
  });
});

describe('sendContact — branche catch', () => {
  it('retourne une erreur si le second envoi rejette (les 2 ont été tentés)', async () => {
    envoiMock
      .mockResolvedValueOnce({ data: { id: 'msg_1' }, error: null })
      .mockRejectedValueOnce(new Error('réseau'));

    const resultat = await sendContact(donneesValides);

    expect(resultat).toEqual({
      ok: false,
      error: "L'envoi a échoué. Réessayez ou contactez-nous par e-mail.",
    });
    expect(envoiMock).toHaveBeenCalledTimes(2);
  });

  it('n’envoie pas l’accusé de réception si la notification rejette (séquentialité)', async () => {
    envoiMock.mockRejectedValueOnce(new Error('réseau'));

    const resultat = await sendContact(donneesValides);

    expect(resultat).toEqual({
      ok: false,
      error: "L'envoi a échoué. Réessayez ou contactez-nous par e-mail.",
    });
    // Un seul appel : le `await` du premier envoi coupe la séquence.
    expect(envoiMock).toHaveBeenCalledTimes(1);
  });
});
