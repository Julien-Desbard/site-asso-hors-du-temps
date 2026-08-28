import { getPayload } from 'payload';
import { unstable_cache } from 'next/cache';
import config from '../payload.config.ts';
import type { AccueilPage, Article, ArticlePresse, BenevolatPage, Dimanche, EtapeAccueil, FriseHistorique, Historique, MembreEquipe, Parametre, RapportActivite } from '../payload-types.ts';

export async function getArticles(): Promise<Article[]> {
  return unstable_cache(
    async () => {
      const payload = await getPayload({ config });
      const { docs } = await payload.find({
        collection: 'articles',
        depth: 1,
        draft: false,
        sort: ['-date', 'createdAt'],
        limit: 50,
      });
      return docs;
    },
    ['articles'],
    { tags: ['articles'] },
  )();
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return unstable_cache(
    async (articleSlug: string) => {
      const payload = await getPayload({ config });
      const { docs } = await payload.find({
        collection: 'articles',
        depth: 1,
        draft: false,
        where: { slug: { equals: articleSlug } },
        limit: 1,
      });
      return docs[0] ?? null;
    },
    ['article-by-slug'],
    { tags: ['articles'] },
  )(slug);
}

export async function getMembresEquipe(): Promise<MembreEquipe[]> {
  return unstable_cache(
    async () => {
      const payload = await getPayload({ config });
      const { docs } = await payload.find({
        collection: 'membre-equipe',
        depth: 1,
        draft: false,
        sort: 'ordre',
        limit: 50,
      });
      return docs;
    },
    ['membre-equipe'],
    { tags: ['membre-equipe'] },
  )();
}

export async function getHistorique(): Promise<Historique | null> {
  return unstable_cache(
    async () => {
      const payload = await getPayload({ config });
      return payload.findGlobal({ slug: 'historique', depth: 1, draft: false });
    },
    ['historique'],
    { tags: ['historique'] },
  )();
}

export async function getFriseHistorique(): Promise<FriseHistorique[]> {
  return unstable_cache(
    async () => {
      const payload = await getPayload({ config });
      const { docs } = await payload.find({
        collection: 'frise-historique',
        depth: 1,
        draft: false,
        sort: 'ordre',
        limit: 50,
      });
      return docs;
    },
    ['frise-historique'],
    { tags: ['frise-historique'] },
  )();
}

export async function getEtapesAccueil(): Promise<EtapeAccueil[]> {
  return unstable_cache(
    async () => {
      const payload = await getPayload({ config });
      const { docs } = await payload.find({
        collection: 'etape-accueil',
        depth: 1,
        draft: false,
        sort: 'ordre',
        limit: 50,
      });
      return docs;
    },
    ['etape-accueil'],
    { tags: ['etape-accueil'] },
  )();
}

export async function getParametres(): Promise<Parametre | null> {
  return unstable_cache(
    async () => {
      const payload = await getPayload({ config });
      return payload.findGlobal({ slug: 'parametre', draft: false });
    },
    ['parametre'],
    { tags: ['parametre'] },
  )();
}

export async function getDimanches(): Promise<Dimanche | null> {
  return unstable_cache(
    async () => {
      const payload = await getPayload({ config });
      return payload.findGlobal({ slug: 'dimanche', depth: 1, draft: false });
    },
    ['dimanche'],
    { tags: ['dimanche'] },
  )();
}

export async function getAccueilPage(): Promise<AccueilPage | null> {
  return unstable_cache(
    async () => {
      const payload = await getPayload({ config });
      return payload.findGlobal({ slug: 'accueil-page', depth: 1, draft: false });
    },
    ['accueil-page'],
    { tags: ['accueil-page'] },
  )();
}

export async function getBenevolatPage(): Promise<BenevolatPage | null> {
  return unstable_cache(
    async () => {
      const payload = await getPayload({ config });
      return payload.findGlobal({ slug: 'benevolat-page', draft: false });
    },
    ['benevolat-page'],
    { tags: ['benevolat-page'] },
  )();
}

export async function getArticlesPresse(): Promise<ArticlePresse[]> {
  return unstable_cache(
    async () => {
      const payload = await getPayload({ config });
      const { docs } = await payload.find({
        collection: 'article-presse',
        depth: 1,
        draft: false,
        sort: 'ordre',
        limit: 50,
      });
      return docs;
    },
    ['article-presse'],
    { tags: ['article-presse'] },
  )();
}

export async function getRapportsActivite(): Promise<RapportActivite[]> {
  return unstable_cache(
    async () => {
      const payload = await getPayload({ config });
      const { docs } = await payload.find({
        collection: 'rapport-activite',
        depth: 1,
        draft: false,
        sort: 'ordre',
        limit: 50,
      });
      return docs;
    },
    ['rapport-activite'],
    { tags: ['rapport-activite'] },
  )();
}
