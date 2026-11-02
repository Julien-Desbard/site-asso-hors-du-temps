import type { Metadata } from 'next';
import { kalam, nunito, patrickHand } from '../fonts';
import './fonds.css';

// Mise en page autonome du fonds de dotation : pas d'en-tête ni de pied de page du
// site de l'association. Root layout distinct (pattern « multiple root layouts »),
// comme (marketing) et (payload).

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://assohorsdutemps.fr';

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: 'Fonds de dotation La maison Hors du Temps — Aidez-nous à racheter la maison',
  description:
    'Participez au rachat de la maison de répit de Saint-Marcellin (Isère) via le fonds de dotation « La maison Hors du Temps ». Réduction d’impôt de 66 % (particuliers) ou 60 % (entreprises).',
  openGraph: {
    siteName: 'Fonds de dotation La maison Hors du Temps',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: '/fonds/fonds-maison.jpg', width: 1020, height: 500, alt: 'La maison Hors du Temps à Saint-Marcellin' }],
  },
  robots: { index: true, follow: true },
};

export default function FondsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${kalam.variable} ${nunito.variable} ${patrickHand.variable}`}>
      <body>{children}</body>
    </html>
  );
}
