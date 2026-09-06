import { getPayload } from 'payload';
import { unstable_cache } from 'next/cache';
import config from '../payload.config.ts';
import type { AccueilPage, Article, ArticlePresse, BenevolatPage, Dimanche, EtapeAccueil, FriseHistorique, Historique, MembreEquipe, Parametre, RapportActivite } from '../payload-types.ts';
import {
  ACCUEIL_PAGE_SECOURS,
  ARTICLES_PRESSE_SECOURS,
  ARTICLES_SECOURS,
  BENEVOLAT_PAGE_SECOURS,
  ETAPES_ACCUEIL_SECOURS,
  FRISE_HISTORIQUE_SECOURS,
  HISTORIQUE_SECOURS,
  MEMBRES_EQUIPE_SECOURS,
  PARAMETRES_SECOURS,
  RAPPORTS_ACTIVITE_SECOURS,
} from './fallbacks.ts';

// Dégradation gracieuse : si la base est injoignable, on sert le contenu de secours
// plutôt que de renvoyer une 500 sur 9 pages sur 12.
//
// Le try/catch entoure volontairement l'APPEL de unstable_cache(...)(), jamais
// l'intérieur du callback. `unstable_cache` n'écrit dans le cache que sur le chemin de
// résolution : si le callback rejette, rien n'est mémorisé. Un try/catch *dedans* ferait
// passer le repli pour un succès et le figerait en cache un an — une panne de 30 s
// bloquerait le site sur le contenu de seed, l'invalidation par tag étant elle-même
// impossible pendant la panne. Ici le repli ne vaut que pour la requête en cours : dès
// que la base revient, la requête suivante repeuple le cache.
async function avecSecours<T>(nom: string, lecture: () => Promise<T>, replis: T): Promise<T> {
  try {
    return await lecture();
  } catch (erreur) {
    console.error(`[payload] ${nom} : lecture impossible, contenu de secours servi.`, erreur);
    return replis;
  }
}

export async function getArticles(): Promise<Article[]> {
  const lecture = unstable_cache(
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
  );

  return avecSecours('getArticles', lecture, ARTICLES_SECOURS);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const lecture = unstable_cache(
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
  );

  // Un slug inconnu doit toujours mener à notFound(), même en mode dégradé.
  return avecSecours(
    'getArticleBySlug',
    () => lecture(slug),
    ARTICLES_SECOURS.find((article) => article.slug === slug) ?? null,
  );
}

export async function getMembresEquipe(): Promise<MembreEquipe[]> {
  const lecture = unstable_cache(
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
  );

  return avecSecours('getMembresEquipe', lecture, MEMBRES_EQUIPE_SECOURS);
}

export async function getHistorique(): Promise<Historique | null> {
  const lecture = unstable_cache(
    async () => {
      const payload = await getPayload({ config });
      return payload.findGlobal({ slug: 'historique', depth: 1, draft: false });
    },
    ['historique'],
    { tags: ['historique'] },
  );

  return avecSecours('getHistorique', lecture, HISTORIQUE_SECOURS);
}

export async function getFriseHistorique(): Promise<FriseHistorique[]> {
  const lecture = unstable_cache(
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
  );

  return avecSecours('getFriseHistorique', lecture, FRISE_HISTORIQUE_SECOURS);
}

export async function getEtapesAccueil(): Promise<EtapeAccueil[]> {
  const lecture = unstable_cache(
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
  );

  return avecSecours('getEtapesAccueil', lecture, ETAPES_ACCUEIL_SECOURS);
}

export async function getParametres(): Promise<Parametre | null> {
  const lecture = unstable_cache(
    async () => {
      const payload = await getPayload({ config });
      return payload.findGlobal({ slug: 'parametre', draft: false });
    },
    ['parametre'],
    { tags: ['parametre'] },
  );

  return avecSecours('getParametres', lecture, PARAMETRES_SECOURS);
}

export async function getDimanches(): Promise<Dimanche | null> {
  const lecture = unstable_cache(
    async () => {
      const payload = await getPayload({ config });
      return payload.findGlobal({ slug: 'dimanche', depth: 1, draft: false });
    },
    ['dimanche'],
    { tags: ['dimanche'] },
  );

  // Aucune donnée de seed : le flyer du dimanche est déposé à la main dans l'admin.
  // Le repli est donc `null`, que les pages savent déjà masquer.
  return avecSecours('getDimanches', lecture, null);
}

export async function getAccueilPage(): Promise<AccueilPage | null> {
  const lecture = unstable_cache(
    async () => {
      const payload = await getPayload({ config });
      return payload.findGlobal({ slug: 'accueil-page', depth: 1, draft: false });
    },
    ['accueil-page'],
    { tags: ['accueil-page'] },
  );

  return avecSecours('getAccueilPage', lecture, ACCUEIL_PAGE_SECOURS);
}

export async function getBenevolatPage(): Promise<BenevolatPage | null> {
  const lecture = unstable_cache(
    async () => {
      const payload = await getPayload({ config });
      return payload.findGlobal({ slug: 'benevolat-page', draft: false });
    },
    ['benevolat-page'],
    { tags: ['benevolat-page'] },
  );

  return avecSecours('getBenevolatPage', lecture, BENEVOLAT_PAGE_SECOURS);
}

export async function getArticlesPresse(): Promise<ArticlePresse[]> {
  const lecture = unstable_cache(
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
  );

  return avecSecours('getArticlesPresse', lecture, ARTICLES_PRESSE_SECOURS);
}

export async function getRapportsActivite(): Promise<RapportActivite[]> {
  const lecture = unstable_cache(
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
  );

  return avecSecours('getRapportsActivite', lecture, RAPPORTS_ACTIVITE_SECOURS);
}
