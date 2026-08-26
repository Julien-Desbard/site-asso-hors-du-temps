'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { sendContact } from '@/app/actions/sendContact';
import styles from './ContactForm.module.css';

const schema = z.object({
  prenom: z.string().min(1, 'Prénom requis'),
  nom: z.string().min(1, 'Nom requis'),
  email: z.string().email('Adresse e-mail invalide'),
  tel: z.string().optional(),
  sujet: z.string().optional(),
  message: z.string().min(10, 'Message trop court (10 caractères min.)'),
  // Honeypot anti-bot : champ caché, doit rester vide.
  site_web: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState('');
  const startedAtRef = useRef(Date.now());

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setServerError('');
    const result = await sendContact({ ...data, startedAt: startedAtRef.current });
    if (result.ok) {
      setSent(true);
    } else {
      setServerError(result.error);
    }
  };

  if (sent) {
    return (
      <div className={styles.success}>
        <div className={styles.successIcon}>✓</div>
        <h3>Merci, votre message est parti !</h3>
        <p>Vous allez recevoir une copie de votre message ainsi qu&rsquo;une confirmation à l&rsquo;adresse indiquée. À très vite.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="site_web">Site web</label>
        <input id="site_web" type="text" tabIndex={-1} autoComplete="off" {...register('site_web')} />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="prenom">Prénom *</label>
          <input id="prenom" type="text" autoComplete="given-name" {...register('prenom')} />
          {errors.prenom && <span className={styles.err}>{errors.prenom.message}</span>}
        </div>
        <div className={styles.field}>
          <label htmlFor="nom">Nom *</label>
          <input id="nom" type="text" autoComplete="family-name" {...register('nom')} />
          {errors.nom && <span className={styles.err}>{errors.nom.message}</span>}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="email">Courriel *</label>
          <input id="email" type="email" autoComplete="email" {...register('email')} />
          <span className={styles.note}>Pour vous envoyer notre réponse et la confirmation.</span>
          {errors.email && <span className={styles.err}>{errors.email.message}</span>}
        </div>
        <div className={styles.field}>
          <label htmlFor="tel">Téléphone</label>
          <input id="tel" type="tel" autoComplete="tel" {...register('tel')} />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="sujet">Objet</label>
        <input id="sujet" type="text" placeholder="Demande d'accueil, bénévolat, don, question…" {...register('sujet')} />
      </div>

      <div className={styles.field}>
        <label htmlFor="message">Votre message *</label>
        <textarea id="message" placeholder="Dites-nous ce qui vous amène, en quelques mots." {...register('message')} />
        {errors.message && <span className={styles.err}>{errors.message.message}</span>}
      </div>

      {serverError && <p className={styles.err}>{serverError}</p>}

      <button className="btn btn-primary" type="submit" disabled={isSubmitting} style={{ width: '100%' }}>
        {isSubmitting ? 'Envoi en cours…' : 'Envoyer mon message'}
      </button>
      <span className={styles.note} style={{ marginTop: 14, display: 'block' }}>
        * Champs obligatoires. Vos données ne servent qu&rsquo;à vous répondre et ne sont jamais transmises à des tiers.
      </span>
    </form>
  );
}
