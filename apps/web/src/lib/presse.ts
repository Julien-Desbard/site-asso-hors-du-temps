// Utilitaires de la section « On parle de nous… » (articles de presse).

const MOIS = [
  'janvier',
  'février',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'août',
  'septembre',
  'octobre',
  'novembre',
  'décembre',
];

/** « 2026-03-12T00:00:00.000Z » → « mars 2026 ». */
export function formaterMoisAnnee(dateIso: string): string {
  const date = new Date(dateIso);
  // Lecture en UTC : Payload stocke la date à minuit UTC, un fuseau négatif
  // la ferait basculer au mois précédent pour un 1er du mois.
  return `${MOIS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

/**
 * Extrait l'identifiant d'une vidéo YouTube depuis son lien, ou null si le lien
 * n'est pas une vidéo YouTube. Gère youtu.be/ID, youtube.com/watch?v=ID,
 * /shorts/ID, /embed/ID et /live/ID (avec ou sans « www. » / « m. »).
 */
export function idVideoYoutube(lien: string): string | null {
  let url: URL;
  try {
    url = new URL(lien);
  } catch {
    return null;
  }

  const hote = url.hostname.replace(/^(www|m)\./, '');
  let id: string | null = null;

  if (hote === 'youtu.be') {
    id = url.pathname.split('/')[1] ?? null;
  } else if (hote === 'youtube.com' || hote === 'youtube-nocookie.com') {
    if (url.pathname === '/watch') {
      id = url.searchParams.get('v');
    } else {
      const [, type, valeur] = url.pathname.split('/');
      if (type && ['shorts', 'embed', 'live'].includes(type)) id = valeur ?? null;
    }
  }

  // Un id YouTube fait 11 caractères parmi [A-Za-z0-9_-] ; on refuse le reste pour
  // ne jamais injecter n'importe quoi dans l'URL de l'iframe.
  return id && /^[\w-]{11}$/.test(id) ? id : null;
}
