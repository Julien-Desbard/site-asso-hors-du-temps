'use server';

import { Resend } from 'resend';
import { z } from 'zod';

const schema = z.object({
  prenom: z.string().min(1, 'Prénom requis'),
  nom: z.string().min(1, 'Nom requis'),
  email: z.string().email('Adresse e-mail invalide'),
  tel: z.string().optional(),
  sujet: z.string().optional(),
  message: z.string().min(10, 'Message trop court (10 caractères min.)'),
  // Honeypot : champ caché côté UI, un humain le laisse toujours vide.
  site_web: z.string().optional(),
  // Timestamp de montage du formulaire côté client (Date.now()).
  startedAt: z.number(),
});

export type ContactFormData = z.infer<typeof schema>;
export type SendContactResult = { ok: true } | { ok: false; error: string };

const AUTO_REPLY = "Un grand merci de votre intérêt pour notre association, nous vous répondrons dès que possible ! Bien à vous. L'équipe de l'Hors du Temps.";

// Délai minimum entre l'affichage du formulaire et sa soumission : un bot qui
// remplit et poste immédiatement passe en dessous de ce seuil.
const MIN_SUBMIT_DELAY_MS = 2000;

export async function sendContact(data: ContactFormData): Promise<SendContactResult> {
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.errors[0]?.message ?? 'Données invalides' };
  }

  const { prenom, nom, email, tel, sujet, message, site_web, startedAt } = parsed.data;

  // Anti-abus volontairement stateless (honeypot + délai minimum), sans
  // rate limiting : le cold start des fonctions serverless Vercel rend un
  // compteur in-memory peu fiable, et une dépendance dédiée (Redis/Upstash)
  // est disproportionnée tant qu'un abus réel n'est pas constaté. Si le
  // besoin apparaît, le Firewall Vercel natif peut être activé sans
  // changement de code. On répond succès (faux positif silencieux) pour ne
  // pas signaler la détection à l'appelant.
  if (site_web || Date.now() - startedAt < MIN_SUBMIT_DELAY_MS) {
    return { ok: true };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, error: 'Service email non configuré.' };
  }

  const resend = new Resend(apiKey);
  const to = process.env.CONTACT_EMAIL ?? 'asso.horsdutemps@gmail.com';
  const from = process.env.RESEND_FROM ?? 'contact@assohorsdutemps.fr';

  try {
    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: sujet ?? `Message de ${prenom} ${nom}`,
      text: `De : ${prenom} ${nom} <${email}>${tel ? `\nTél : ${tel}` : ''}\n\n${message}`,
    });

    await resend.emails.send({
      from,
      to: email,
      subject: "Votre message à L'Hors du Temps",
      text: `Bonjour ${prenom},\n\n${AUTO_REPLY}\n\n---\nVotre message :\n${message}`,
    });
  } catch {
    return { ok: false, error: "L'envoi a échoué. Réessayez ou contactez-nous par e-mail." };
  }

  return { ok: true };
}
