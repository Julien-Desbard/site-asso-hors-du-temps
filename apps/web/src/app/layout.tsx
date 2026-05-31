import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import './globals.css';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://assohorsdutemps.fr';

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "L'Hors du Temps — Une maison pour souffler à Saint-Marcellin",
    template: "%s — L'Hors du Temps",
  },
  description:
    "L'Hors du Temps : une maison à Saint-Marcellin (Isère) qui accueille pour quelques jours celles et ceux qui ont besoin de faire une halte.",
  openGraph: {
    siteName: "L'Hors du Temps",
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: '/logo.png', width: 800, height: 200, alt: "L'Hors du Temps" }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <a href="#main-content" className="skip-link">Aller au contenu principal</a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
