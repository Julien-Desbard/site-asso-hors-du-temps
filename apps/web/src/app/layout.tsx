import type { Metadata } from 'next';

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
      <body>{children}</body>
    </html>
  );
}
