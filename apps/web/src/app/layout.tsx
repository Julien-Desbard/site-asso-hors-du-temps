import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import './globals.css';

export const metadata: Metadata = {
  title: "L'Hors du Temps — Une maison pour souffler à Saint-Marcellin",
  description:
    "L'Hors du Temps : une maison à Saint-Marcellin (Isère) qui accueille pour quelques jours celles et ceux qui ont besoin de faire une halte.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
