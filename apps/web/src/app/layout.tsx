import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getParametres } from '@/lib/payload';
import './globals.css';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://assohorsdutemps.fr';

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "L'Hors du Temps — Une maison pour souffler à Saint-Marcellin",
    template: "%s — L'Hors du Temps",
  },
  description:
    "L'Hors du Temps : lieu de répit bénévole à Saint-Marcellin (Isère). Accueil gratuit pour quelques jours pour souffler, retrouver confiance et du lien. Association loi 1901 fondée en 2010.",
  openGraph: {
    siteName: "L'Hors du Temps",
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: "L'Hors du Temps — lieu de répit à Saint-Marcellin" }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE}/#website`,
  url: BASE,
  name: "L'Hors du Temps",
  description: "Site officiel de l'association L'Hors du Temps — lieu de répit bénévole à Saint-Marcellin, Isère.",
  inLanguage: 'fr-FR',
  publisher: { '@id': `${BASE}/#organization` },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const params = await getParametres();
  const sameAs = [
    params?.don_fonctionnement_url,
    params?.benevolat_url,
    params?.facebook_url,
  ].filter((url): url is string => Boolean(url));

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'NGO'],
    '@id': `${BASE}/#organization`,
    name: "L'Hors du Temps",
    alternateName: "Ensemble pour l'Hors du Temps",
    url: BASE,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE}/logo.png`,
    },
    description:
      "L'Hors du Temps est un lieu de répit bénévole à Saint-Marcellin (Isère), association loi 1901 fondée en 2010, qui accueille gratuitement des adultes en situation de fragilité pour des séjours de quelques jours à plusieurs semaines.",
    foundingDate: '2010',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '24 rue de la Fusilière',
      addressLocality: 'Saint-Marcellin',
      postalCode: '38160',
      addressRegion: 'Isère',
      addressCountry: 'FR',
    },
    telephone: '+33748101994',
    email: 'asso.horsdutemps@gmail.com',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+33748101994',
      email: 'asso.horsdutemps@gmail.com',
      contactType: 'customer support',
      availableLanguage: 'French',
      areaServed: 'FR',
    },
    sameAs,
  };

  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Aller au contenu principal</a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
