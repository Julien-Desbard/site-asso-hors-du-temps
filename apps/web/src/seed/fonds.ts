// Contenu initial de la page Fonds de dotation, repris du dépliant PDF du client
// (« fdd A4 def 2508.pdf », août 2026).
//
// Utilisé à trois endroits : la migration qui remplit le global en prod, le seed du CI
// et le contenu de secours (base injoignable). Ce fichier est importé tel quel par
// Node (les migrations sont chargées hors du bundler Next) : pas d'import autre que
// de type, pas de syntaxe TypeScript non effaçable.

export const fondsDotationDefaut = {
  photo_couverture_defaut: '/fonds/fonds-maison.jpg',
  titre: 'Aidez-nous à la racheter !',
  projet_titre: 'Récolter des fonds pour acheter la maison',
  projet_texte:
    'En 2027, la propriété qui accueille notre association doit être rachetée pour pérenniser nos actions.\n\nUn fonds de dotation est créé pour accueillir les dons.',
  collecte: {
    titre: 'État des lieux et objectifs',
    recolte: 130000,
    objectif_libelle: 'Nouvel objectif de fin d’année\u00a0:',
    objectif: 100000,
    echeance: 'd’ici décembre 2026',
  },

  fonds_titre: 'Le fonds de dotation',
  fonds_sous_titre: '« La maison Hors du Temps »',
  fonds_photo_defaut: '/fonds/fonds-arbre.jpg',
  fonds_texte: [
    'Un fonds de dotation est un organisme qui a pour objet d’aider un autre organisme à but non lucratif pour accomplir une œuvre ou une mission d’intérêt général.',
    'En participant au rachat de la maison, vous soutenez l’activité de l’association « Ensemble pour l’Hors du Temps ».',
    'Avec une équipe solide, plus de 200 donateurs, elle a proposé, depuis 2009, des séjours de répit à plus de 170 personnes.',
    'Le Fonds de dotation « La maison Hors du Temps » se charge de la collecte et la gestion des dons. Il devient propriétaire et gestionnaire de la maison et passe une convention d’occupation avec l’association « Ensemble pour l’Hors du Temps ».',
  ].join('\n\n'),
  pastilles: [
    { titre: 'Donner en confiance', texte: 'Expert comptable et commissaire aux comptes obligatoire' },
    { titre: 'Avantages fiscaux particuliers', texte: 'Réduction d’impôt sur le revenu\u00a0: 66\u00a0% du don' },
    { titre: 'Avantages fiscaux entreprises', texte: 'Réduction d’impôt sur les sociétés\u00a0: 60\u00a0% du don' },
  ],
  arguments: [
    { texte: 'Pour un projet innovant et original,' },
    { texte: 'qui a fait ses preuves,' },
    { texte: 'connu et reconnu,' },
    { texte: 'complémentaire des services sociaux et de santé.' },
  ],
  participer_titre: 'Comment participer\u00a0?',
  participer_intro: 'Envoyez-nous un mail à\u00a0:',
  participer_details: 'en indiquant votre nom, prénom, adresse postale et mail, numéro de téléphone. Merci !',
  don_libelle: 'Faire un don en ligne',
  don_url: 'https://www.helloasso.com/associations/l-hors-du-temps/formulaires/2',

  refuge_titre: 'Un refuge pour',
  refuge_verbes: [
    { texte: 'Se poser' },
    { texte: 'Souffler' },
    { texte: 'Vivre ensemble' },
    { texte: 'Se reconstruire' },
    { texte: 'Sortir de l’isolement' },
  ],
  asso_texte: [
    'Ensemble pour l’Hors du temps est une association 1901, reconnue d’intérêt général. Elle a pour mission d’accueillir des adultes qui « n’en peuvent plus » dans un lieu paisible pour un temps de vie partagé.',
    'Cet accueil permet à chacun de faire une halte, de se reposer, de reprendre confiance, de retrouver joie de vivre, force, estime de soi et considération aux yeux des autres. (Article 2 des statuts).',
  ].join('\n\n'),
  asso_lien_libelle: 'assohorsdutemps-blog.over-blog.com',
  asso_lien_url: 'https://assohorsdutemps-blog.over-blog.com',
  chiffres_annee: '2025',
  chiffres: [
    { valeur: '949', libelle: 'nuitées', icone: 'maison' as const },
    { valeur: '30', libelle: 'personnes accueillies', icone: 'lit' as const },
    { valeur: '15', libelle: 'femmes', icone: 'femme' as const },
    { valeur: '15', libelle: 'hommes', icone: 'homme' as const },
    { valeur: '3280', libelle: 'repas servis', icone: 'repas' as const },
  ],
  problematiques_titre: 'Problématiques principales',
  problematiques_note: 'Les personnes accueillies peuvent cumuler plusieurs problématiques.',
  problematiques: [
    { pourcentage: 90, libelle: 'Déprime, dépressions, troubles mentaux' },
    { pourcentage: 95, libelle: 'Isolement, solitude, environnement conflictuel' },
    { pourcentage: 50, libelle: 'Mauvaise santé, handicaps' },
    { pourcentage: 30, libelle: 'Problèmes de logement' },
  ],

  temoignages: [
    { citation: 'Ça me permet de voir du monde, ça fait du bien.', photo_defaut: '/fonds/fonds-temoignage-1.jpg' },
    { citation: 'Ici, on me fout la paix.', photo_defaut: '/fonds/fonds-temoignage-2.jpg' },
    {
      citation: 'J’étais un oiseau blessé et j’ai pu retrouver mes ailes et prendre mon envol !',
      photo_defaut: '/fonds/fonds-temoignage-3.jpg',
    },
    {
      citation: 'Besoin de trouver un lieu neutre, nouveau et éloigné pour prendre du recul.',
      photo_defaut: '/fonds/fonds-temoignage-4.jpg',
    },
    {
      citation: 'Le tremplin qui m’a permis de m’ouvrir enfin aux autres.',
      photo_defaut: '/fonds/fonds-temoignage-5.jpg',
    },
    {
      citation: 'Cette pause chez vous m’a donné le courage de rêver à une vie meilleure.',
      photo_defaut: '/fonds/fonds-temoignage-6.jpg',
    },
  ],

  pied_nom: 'Fonds de dotation La maison Hors du Temps',
  pied_adresse: '24 rue de la Fusilière 38160 St Marcellin',
  pied_telephone: '06 27 51 77 33',
  pied_email: 'lamaisonhordutemps@laposte.net',
};
