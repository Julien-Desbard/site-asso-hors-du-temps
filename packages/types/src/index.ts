// Types partagés entre apps/web et apps/cms
// Reflète les content-types Strapi (rempli au Chunk 1)

export interface StrapiImageFormat {
  url: string;
  width: number;
  height: number;
}

export interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/** Article (actualités) */
export interface Article {
  id: number;
  documentId: string;
  titre: string;
  slug: string;
  date: string;
  extrait: string;
  contenu: unknown; // Strapi blocks — typé finement au Chunk 4
  image_principale: StrapiImage | null;
  galerie: StrapiImage[];
  lien_externe: string | null;
  a_la_une: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

/** Membre de l'équipe */
export interface MembreEquipe {
  id: number;
  documentId: string;
  prenom: string;
  role: string;
  presentation: string;
  photo: StrapiImage | null;
  ordre: number;
  publishedAt: string | null;
}

/** Récit narratif de l'historique de l'association (single type) */
export interface Historique {
  recit: string;
  publishedAt: string | null;
}

/** Entrée de la frise chronologique */
export interface FriseHistorique {
  id: number;
  documentId: string;
  annee: string;
  evenement: string;
  ordre: number;
  publishedAt: string | null;
}

/** Étape du processus d'accueil */
export interface EtapeAccueil {
  id: number;
  documentId: string;
  titre: string;
  tag: string;
  description: string;
  ordre: number;
  publishedAt: string | null;
}

/** Paramètres globaux éditables (liens dons, bénévolat, réseaux) */
export interface Parametre {
  don_fonctionnement_url: string | null;
  don_fonds_dotation_url: string | null;
  benevolat_url: string | null;
  facebook_url: string | null;
  mecenat_url: string | null;
}

/** Dimanches Ensemble — flyer media */
export interface Dimanche {
  flyer: StrapiImage | null;
}

/** Page Accueil (Être accueilli) — vie commune et activités */
export interface AccueilPage {
  vie_commune_texte: string | null;
  vie_commune_image: StrapiImage | null;
  activites_texte: string | null;
}
