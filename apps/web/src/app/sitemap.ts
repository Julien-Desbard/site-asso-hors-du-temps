import type { MetadataRoute } from 'next';
import { getArticles } from '@/lib/strapi';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://assohorsdutemps.fr';

const STATIC_ROUTES = [
  { url: BASE, lastModified: new Date('2026-05-01'), priority: 1.0, changeFrequency: 'weekly' as const },
  { url: `${BASE}/qui-sommes-nous`, lastModified: new Date('2026-05-01'), priority: 0.9, changeFrequency: 'monthly' as const },
  { url: `${BASE}/etre-accueilli`, lastModified: new Date('2026-05-01'), priority: 0.9, changeFrequency: 'monthly' as const },
  { url: `${BASE}/benevolat`, lastModified: new Date('2026-05-01'), priority: 0.8, changeFrequency: 'monthly' as const },
  { url: `${BASE}/actualites`, lastModified: new Date(), priority: 0.9, changeFrequency: 'weekly' as const },
  { url: `${BASE}/fonds-de-dotation`, lastModified: new Date('2026-02-01'), priority: 0.8, changeFrequency: 'monthly' as const },
  { url: `${BASE}/nous-contacter`, lastModified: new Date('2026-05-01'), priority: 0.7, changeFrequency: 'yearly' as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let articleRoutes: MetadataRoute.Sitemap = [];
  try {
    const articles = await getArticles();
    articleRoutes = articles.map((a) => ({
      url: `${BASE}/actualites/${a.slug}`,
      lastModified: new Date(a.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch { /* Strapi indisponible */ }

  return [...STATIC_ROUTES, ...articleRoutes];
}
