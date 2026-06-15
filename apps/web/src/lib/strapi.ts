import type { Article, EtapeAccueil, FriseHistorique, Historique, MembreEquipe, StrapiResponse } from '@hors-du-temps/types';

const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';
const TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN ?? '';

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
