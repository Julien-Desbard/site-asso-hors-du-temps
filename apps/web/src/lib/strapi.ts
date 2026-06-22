import type { AccueilPage, Article, Dimanche, EtapeAccueil, FriseHistorique, Historique, MembreEquipe, Parametre, StrapiResponse } from '@hors-du-temps/types';

const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';
const TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN ?? '';

// Fallback articles si Strapi est inatteignable (mode démo Vercel ou panne) : reprend le texte de seed du CMS (apps/cms/src/index.ts).
// Utilisé par app/page.tsx, app/actualites/page.tsx et app/actualites/[slug]/page.tsx.
export const FALLBACK_ARTICLES: Article[] = [
  {
    id: -1,
    documentId: 'fallback-1',
    titre: 'Aidez-nous à racheter la maison !',
    slug: 'aidez-nous-a-racheter-la-maison',
    date: '2026-04-29',
    extrait: 'En 2027, la propriété sera mise en vente. Le fonds de dotation « La maison Hors du Temps » est lancé pour la racheter — premier palier déjà franchi.',
    contenu: null,
    image_principale: null,
    galerie: [],
    lien_externe: null,
    a_la_une: true,
    publishedAt: null,
    createdAt: '2026-04-29',
    updatedAt: '2026-04-29',
  },
  {
    id: -2,
    documentId: 'fallback-2',
    titre: 'Lettre aux adhérents — Avril 2026',
    slug: 'lettre-adherents-avril-2026',
    date: '2026-04-29',
    extrait: "L'aventure continue : une nouvelle équipe prend le relais avec enthousiasme. Rendez-vous à la prochaine assemblée générale.",
    contenu: null,
    image_principale: null,
    galerie: [],
    lien_externe: null,
    a_la_une: false,
    publishedAt: null,
    createdAt: '2026-04-29',
    updatedAt: '2026-04-29',
  },
  {
    id: -3,
    documentId: 'fallback-3',
    titre: "Retour sur l'AG et les Dimanches ensemble",
    slug: 'retour-ag-dimanches-ensemble-2025',
    date: '2025-07-16',
    extrait: 'Un repas sous les arbres, un bal folk, des rires partagés. Merci à toutes et tous pour ces moments suspendus.',
    contenu: null,
    image_principale: null,
    galerie: [],
    lien_externe: null,
    a_la_une: false,
    publishedAt: null,
    createdAt: '2025-07-16',
    updatedAt: '2025-07-16',
  },
];

async function strapiGet<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`/api${path}`, BASE_URL);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      url.searchParams.set(k, v);
    }
  }

  const res = await fetch(url.toString(), {
    headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {},
    next: { revalidate: 3600, tags: [path.replace(/^\//, '').split('/')[0]] },
  });

  if (!res.ok) throw new Error(`Strapi ${res.status} ${path}`);
  return res.json() as Promise<T>;
}

export async function getArticles(): Promise<Article[]> {
  const data = await strapiGet<StrapiResponse<Article[]>>('/articles', {
    'populate': 'image_principale',
    'sort': 'date:desc',
    'pagination[pageSize]': '50',
  });
  return data.data;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const data = await strapiGet<StrapiResponse<Article[]>>('/articles', {
    'filters[slug][$eq]': slug,
    'populate': 'image_principale,galerie',
  });
  return data.data[0] ?? null;
}

export async function getMembresEquipe(): Promise<MembreEquipe[]> {
  const data = await strapiGet<StrapiResponse<MembreEquipe[]>>('/membre-equipes', {
    'populate': 'photo',
    'sort': 'ordre:asc',
  });
  return data.data;
}

export async function getHistorique(): Promise<Historique | null> {
  const data = await strapiGet<{ data: Historique | null }>('/historique');
  return data.data;
}

export async function getFriseHistorique(): Promise<FriseHistorique[]> {
  const data = await strapiGet<StrapiResponse<FriseHistorique[]>>('/frise-historiques', {
    'sort': 'ordre:asc',
    'pagination[pageSize]': '50',
  });
  return data.data;
}

export async function getEtapesAccueil(): Promise<EtapeAccueil[]> {
  const data = await strapiGet<StrapiResponse<EtapeAccueil[]>>('/etape-accueils', {
    'sort': 'ordre:asc',
  });
  return data.data;
}

export async function getParametres(): Promise<Parametre | null> {
  const data = await strapiGet<{ data: Parametre | null }>('/parametre');
  return data.data;
}

export async function getDimanches(): Promise<Dimanche | null> {
  const data = await strapiGet<{ data: Dimanche | null }>('/dimanche', {
    'populate': 'flyer',
  });
  return data.data;
}

export async function getAccueilPage(): Promise<AccueilPage | null> {
  const data = await strapiGet<{ data: AccueilPage | null }>('/accueil-page', {
    'populate': 'vie_commune_image',
  });
  return data.data;
}
