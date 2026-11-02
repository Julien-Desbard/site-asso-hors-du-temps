// Utilitaires de la page Fonds de dotation.
import type { Media } from '../payload-types.ts';

/**
 * Remplissage du thermomètre, en pourcentage (0 à 100, arrondi) :
 * récolté ÷ (récolté + objectif supplémentaire).
 */
export function remplissageThermometre(recolte: number, objectif: number): number {
  const total = recolte + objectif;
  if (total <= 0) return 0;
  return Math.round(Math.min(Math.max(recolte / total, 0), 1) * 100);
}

/** 130000 → « 130 000 € » (espaces insécables, format français). */
export function formaterEuros(montant: number): string {
  return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(montant).replace(/\s/g, ' ') + ' €';
}

/**
 * Photo à afficher : celle déposée dans l'admin si elle existe, sinon la photo par
 * défaut (extraite du dépliant PDF, chemin gardé dans le champ caché `*_defaut`).
 */
export function urlPhoto(upload: number | Media | null | undefined, defaut: string | null | undefined): string | null {
  if (upload && typeof upload === 'object' && upload.url) return upload.url;
  return defaut || null;
}

/** Découpe un texte saisi dans l'admin en paragraphes (séparés par une ligne vide). */
export function enParagraphes(texte: string | null | undefined): string[] {
  return (texte ?? '').split(/\n\s*\n+/).map((p) => p.trim()).filter(Boolean);
}
