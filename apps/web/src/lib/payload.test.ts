import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { Article } from '../payload-types.ts';

// Le fichier de test est volontairement dans src/lib/ : le spécificateur du mock
// ('../payload.config.ts') doit être identique à celui du module testé.

const faux = vi.hoisted(() => ({
  cache: new Map<string, unknown>(),
  getPayloadMock: vi.fn(),
}));

// Faux `unstable_cache` reproduisant fidèlement Next : il ne mémorise QUE les succès.
// Sans ce mock, le vrai lance `Invariant: incrementalCache missing` hors runtime Next —
// invariant que le try/catch de `avecSecours` avalerait, faisant passer les tests au
// vert sans exécuter une seule ligne de Payload.
vi.mock('next/cache', () => ({
  unstable_cache:
    (fn: (...args: unknown[]) => Promise<unknown>, cles: string[]) =>
    async (...args: unknown[]) => {
      const cle = JSON.stringify([cles, args]);
      if (faux.cache.has(cle)) return faux.cache.get(cle);
      const resultat = await fn(...args); // si `fn` rejette, on ne mémorise rien
      faux.cache.set(cle, resultat);
      return resultat;
    },
}));

// payload.config.ts est importé au niveau module par lib/payload.ts : sans ce mock, le
// test tirerait buildConfig(), postgresAdapter, sharp et Lexical.
vi.mock('../payload.config.ts', () => ({ default: {} }));
vi.mock('payload', () => ({ getPayload: faux.getPayloadMock }));

import * as lib from './payload';
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
} from './fallbacks';

const PANNE = new Error('ECONNREFUSED');

let journalErreur: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  // Le cache est un vrai cache : on le vide entre les tests pour les isoler.
  faux.cache.clear();
  journalErreur = vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  journalErreur.mockRestore();
});

/** Simule une base joignable renvoyant `docs` pour find() et `global` pour findGlobal(). */
function baseDisponible(docs: unknown[] = [], global: unknown = {}) {
  faux.getPayloadMock.mockResolvedValue({
    find: vi.fn().mockResolvedValue({ docs }),
    findGlobal: vi.fn().mockResolvedValue(global),
  });
}

describe('lib/payload — base injoignable', () => {
  it.each([
    ['getArticles', () => lib.getArticles(), ARTICLES_SECOURS],
    ['getMembresEquipe', () => lib.getMembresEquipe(), MEMBRES_EQUIPE_SECOURS],
    ['getHistorique', () => lib.getHistorique(), HISTORIQUE_SECOURS],
    ['getFriseHistorique', () => lib.getFriseHistorique(), FRISE_HISTORIQUE_SECOURS],
    ['getEtapesAccueil', () => lib.getEtapesAccueil(), ETAPES_ACCUEIL_SECOURS],
    ['getParametres', () => lib.getParametres(), PARAMETRES_SECOURS],
    ['getAccueilPage', () => lib.getAccueilPage(), ACCUEIL_PAGE_SECOURS],
    ['getBenevolatPage', () => lib.getBenevolatPage(), BENEVOLAT_PAGE_SECOURS],
    ['getArticlesPresse', () => lib.getArticlesPresse(), ARTICLES_PRESSE_SECOURS],
    ['getRapportsActivite', () => lib.getRapportsActivite(), RAPPORTS_ACTIVITE_SECOURS],
    ['getDimanches', () => lib.getDimanches(), null],
  ])('%s ne jette pas et sert le contenu de secours', async (_nom, appel, attendu) => {
    faux.getPayloadMock.mockRejectedValue(PANNE);

    await expect(appel()).resolves.toEqual(attendu);
  });

  it('journalise l’échec avec le nom de la fonction et l’erreur', async () => {
    faux.getPayloadMock.mockRejectedValue(PANNE);

    await lib.getArticles();

    expect(journalErreur).toHaveBeenCalledExactlyOnceWith(
      '[payload] getArticles : lecture impossible, contenu de secours servi.',
      PANNE,
    );
  });

  it('getArticleBySlug sert l’article de secours correspondant au slug', async () => {
    faux.getPayloadMock.mockRejectedValue(PANNE);

    // Le slug de l'article à la une, dont dépend e2e/actualites.spec.ts.
    const article = await lib.getArticleBySlug('aidez-nous-a-racheter-la-maison');

    expect(article).toEqual(
      ARTICLES_SECOURS.find((a) => a.slug === 'aidez-nous-a-racheter-la-maison'),
    );
  });

  it('getArticleBySlug renvoie null sur un slug inconnu (donc notFound())', async () => {
    faux.getPayloadMock.mockRejectedValue(PANNE);

    await expect(lib.getArticleBySlug('slug-qui-nexiste-pas')).resolves.toBeNull();
  });
});

describe('lib/payload — base disponible', () => {
  const DOCS = [{ id: 1, titre: 'Depuis la base' }];
  const GLOBAL = { id: 1, valeur: 'Depuis la base' };

  it.each([
    ['getArticles', () => lib.getArticles()],
    ['getMembresEquipe', () => lib.getMembresEquipe()],
    ['getFriseHistorique', () => lib.getFriseHistorique()],
    ['getEtapesAccueil', () => lib.getEtapesAccueil()],
    ['getArticlesPresse', () => lib.getArticlesPresse()],
    ['getRapportsActivite', () => lib.getRapportsActivite()],
  ])('%s renvoie les documents de la base sans rien journaliser', async (_nom, appel) => {
    baseDisponible(DOCS, GLOBAL);

    await expect(appel()).resolves.toEqual(DOCS);
    expect(journalErreur).not.toHaveBeenCalled();
  });

  it.each([
    ['getHistorique', () => lib.getHistorique()],
    ['getParametres', () => lib.getParametres()],
    ['getDimanches', () => lib.getDimanches()],
    ['getAccueilPage', () => lib.getAccueilPage()],
    ['getBenevolatPage', () => lib.getBenevolatPage()],
  ])('%s renvoie le global de la base sans rien journaliser', async (_nom, appel) => {
    baseDisponible(DOCS, GLOBAL);

    await expect(appel()).resolves.toEqual(GLOBAL);
    expect(journalErreur).not.toHaveBeenCalled();
  });

  it('getArticleBySlug renvoie le document trouvé', async () => {
    baseDisponible(DOCS, GLOBAL);

    await expect(lib.getArticleBySlug('depuis-la-base')).resolves.toEqual(DOCS[0]);
    expect(journalErreur).not.toHaveBeenCalled();
  });

  it('getArticleBySlug renvoie null quand la base ne trouve rien', async () => {
    baseDisponible([], GLOBAL);

    await expect(lib.getArticleBySlug('inexistant')).resolves.toBeNull();
  });
});

describe('lib/payload — non-régression architecturale', () => {
  it('ne fige PAS le contenu de secours dans le cache après une panne', async () => {
    const vraisArticles = [{ id: 1, titre: 'Depuis la base' }] as unknown as Article[];

    faux.getPayloadMock.mockRejectedValueOnce(PANNE);
    expect(await lib.getArticles()).toEqual(ARTICLES_SECOURS);

    // La base revient : le rejet n'ayant rien mémorisé, on doit repartir en base.
    // Ce test échoue si le try/catch est déplacé à l'intérieur du callback de
    // unstable_cache (le repli passerait pour un succès et serait mis en cache).
    baseDisponible(vraisArticles);
    expect(await lib.getArticles()).toEqual(vraisArticles);
  });
});
