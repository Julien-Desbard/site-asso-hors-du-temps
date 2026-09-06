// Contenus de secours servis quand la base est injoignable (cf. `avecSecours` dans
// ./payload.ts). Ils reprennent les données de seed, donc le site dégradé affiche le
// même contenu qu'une base fraîchement initialisée.
//
// Les types Payload exigent `id`, `createdAt` et `updatedAt`, absents des données de
// seed. Plutôt qu'un `as`, on annote la destination (`const X: Article[] = …`) :
// TypeScript type alors contextuellement chaque littéral et vérifie tous les champs.
import { seedData } from '../seed/data.ts';
import type {
  AccueilPage,
  Article,
  ArticlePresse,
  BenevolatPage,
  EtapeAccueil,
  FriseHistorique,
  Historique,
  MembreEquipe,
  Parametre,
  RapportActivite,
} from '../payload-types.ts';

// Horodatage neutre : ces documents n'ont jamais été écrits en base.
const HORODATAGE = '1970-01-01T00:00:00.000Z';

// Ids négatifs : une séquence Postgres n'en produit jamais, aucune collision possible
// avec un vrai document si les deux se croisent dans un rendu.
const estampille = (index: number) => ({
  id: -(index + 1),
  createdAt: HORODATAGE,
  updatedAt: HORODATAGE,
});

export const ARTICLES_SECOURS: Article[] = seedData.articles.map((article, i) => ({
  ...article,
  ...estampille(i),
}));

export const MEMBRES_EQUIPE_SECOURS: MembreEquipe[] = seedData.membresEquipe.map((membre, i) => ({
  ...membre,
  ...estampille(i),
}));

export const FRISE_HISTORIQUE_SECOURS: FriseHistorique[] = seedData.friseHistorique.map(
  (etape, i) => ({ ...etape, ...estampille(i) }),
);

export const ETAPES_ACCUEIL_SECOURS: EtapeAccueil[] = seedData.etapesAccueil.map((etape, i) => ({
  ...etape,
  ...estampille(i),
}));

export const ARTICLES_PRESSE_SECOURS: ArticlePresse[] = seedData.articlesPresse.map((article, i) => ({
  ...article,
  ...estampille(i),
}));

export const RAPPORTS_ACTIVITE_SECOURS: RapportActivite[] = seedData.rapportsActivite.map(
  (rapport, i) => ({ ...rapport, ...estampille(i) }),
);

export const HISTORIQUE_SECOURS: Historique = {
  ...seedData.historique,
  ...estampille(0),
};

export const PARAMETRES_SECOURS: Parametre = {
  ...seedData.parametre,
  ...estampille(0),
};

export const ACCUEIL_PAGE_SECOURS: AccueilPage = {
  ...seedData.accueilPage,
  ...estampille(0),
};

// Également utilisé par benevolat/page.tsx pour le cas « global présent mais champ
// vide », qui n'est pas une erreur et n'est donc pas couvert par `avecSecours`.
export const NOTE_BENEVOLAT_DEFAUT = seedData.benevolatPage.note_manuscrite;

export const BENEVOLAT_PAGE_SECOURS: BenevolatPage = {
  ...seedData.benevolatPage,
  ...estampille(0),
};
