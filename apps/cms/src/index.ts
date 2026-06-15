import type { Core } from '@strapi/strapi';

// Données de démo insérées au 1er démarrage si les collections sont vides.
// Supprimer ce fichier (ou vider seedData) en production.

const seedData = {
  historique: {
    recit: `L'Hors du temps a été créé sur une idée de Carole, qui a connu bien des galères, la précarité et a souhaité, avec son mari Bernard, trouver un lieu d'accueil pour que des personnes en difficulté de toutes sortes puissent se poser et qu'on "leur fiche la paix !", sans qu'on leur demande de s'inscrire dans un programme quelconque.

Séduit par ce projet, un propriétaire a proposé de louer sa grande maison pour un bail de très longue durée, située sur les côteaux de Saint-Marcellin, petite ville en Isère. La maison se situe à mi-chemin entre Grenoble et Valence dans la vallée du Sud-Grésivaudan, au pied des montagnes du Vercors.

Durant des années, Carole et Bernard ont accueilli de nombreuses personnes qui ont passé un temps plus ou moins long avec eux avant de reprendre leur route, de retrouver leur chemin...

Au décès de Carole, un autre couple est venu s'installer dans la maison de l'Hors du temps pour poursuivre ce généreux projet. Christine et Jean-Luc ont accueilli un grand nombre de personnes avec l'aide de salariés et de bénévoles pendant près de 5 ans. Ce sont maintenant Régine et Christian qui ont repris le flambeau courant 2026.`,
    publishedAt: new Date().toISOString(),
  },
  friseHistorique: [
    { annee: '2010', evenement: 'Fondation par Carole et Bernard', ordre: 1, publishedAt: new Date().toISOString() },
    { annee: '2015', evenement: 'Équipe de bénévoles réguliers constituée', ordre: 2, publishedAt: new Date().toISOString() },
    { annee: '2019', evenement: 'Lancement des Dimanches Ensemble', ordre: 3, publishedAt: new Date().toISOString() },
    { annee: '2024', evenement: 'Nouveau rythme : un dimanche sur trois', ordre: 4, publishedAt: new Date().toISOString() },
    { annee: '2026', evenement: 'Création du fonds de dotation & nouvelle équipe accueillante', ordre: 5, publishedAt: new Date().toISOString() },
    { annee: '2027', evenement: 'Objectif : rachat de la maison', ordre: 6, publishedAt: new Date().toISOString() },
  ],
  articles: [
    {
      titre: 'Aidez-nous à racheter la maison !',
      slug: 'aidez-nous-a-racheter-la-maison',
      date: '2026-04-29',
      extrait:
        'En 2027, la propriété sera mise en vente. Le fonds de dotation « La maison Hors du Temps » est lancé pour la racheter — premier palier déjà franchi.',
      lien_externe: null,
      a_la_une: true,
      publishedAt: new Date().toISOString(),
    },
    {
      titre: 'Lettre aux adhérents — Avril 2026',
      slug: 'lettre-adherents-avril-2026',
      date: '2026-04-29',
      extrait:
        "L'aventure continue : une nouvelle équipe prend le relais avec enthousiasme. Rendez-vous à la prochaine assemblée générale.",
      lien_externe: null,
      a_la_une: false,
      publishedAt: new Date().toISOString(),
    },
    {
      titre: "Retour sur l'AG et les Dimanches ensemble",
      slug: 'retour-ag-dimanches-ensemble-2025',
      date: '2025-07-16',
      extrait:
        'Un repas sous les arbres, un bal folk, des rires partagés. Merci à toutes et tous pour ces moments suspendus.',
      lien_externe: null,
      a_la_une: false,
      publishedAt: new Date().toISOString(),
    },
  ],
  membresEquipe: [
    {
      prenom: 'Marie',
      role: 'Accueillante principale',
      presentation:
        "C'est une rencontre lors d'un dimanche ensemble qui l'a amenée à rejoindre l'association. Elle coordonne les séjours et veille à ce que chacun trouve sa place à la maison.",
      ordre: 1,
      publishedAt: new Date().toISOString(),
    },
    {
      prenom: 'Jean-Pierre',
      role: 'Jardinier bénévole',
      presentation:
        'Retraité passionné de jardinage, il entretient le potager et les espaces verts. Le jardin est pour lui un lieu de transmission et de partage silencieux.',
      ordre: 2,
      publishedAt: new Date().toISOString(),
    },
    {
      prenom: 'Sylvie',
      role: 'Bénévole cuisine et animation',
      presentation:
        'Cuisinière du cœur, elle prépare les repas partagés et anime les Dimanches Ensemble avec une énergie contagieuse.',
      ordre: 3,
      publishedAt: new Date().toISOString(),
    },
  ],
  etapesAccueil: [
    {
      titre: 'Prendre contact',
      tag: 'on vous écoute',
      description:
        "Vous, un proche ou un travailleur social nous appelez ou nous écrivez. On échange simplement sur votre situation et votre besoin de répit.",
      ordre: 1,
      publishedAt: new Date().toISOString(),
    },
    {
      titre: 'Faire connaissance',
      tag: 'sans jugement',
      description:
        "Un temps d'échange, par téléphone ou sur place, permet de se rencontrer, de présenter la maison et de vérifier ensemble que l'accueil correspond à votre situation.",
      ordre: 2,
      publishedAt: new Date().toISOString(),
    },
    {
      titre: 'Préparer le séjour',
      tag: 'à votre rythme',
      description:
        "On fixe ensemble les dates et la durée du séjour. On vous explique le fonctionnement de la maison et la vie quotidienne avec les autres.",
      ordre: 3,
      publishedAt: new Date().toISOString(),
    },
    {
      titre: 'Le séjour à la maison',
      tag: 'bienvenue',
      description:
        "Vous êtes accueilli pour quelques jours : repos, repas partagés, jardin, balades, moments de calme. Vous participez à la vie commune autant que vous le souhaitez.",
      ordre: 4,
      publishedAt: new Date().toISOString(),
    },
    {
      titre: 'Après le séjour',
      tag: 'on reste en lien',
      description:
        "À votre départ, on prend le temps d'un dernier échange. La porte reste ouverte : beaucoup reviennent, notamment lors des Dimanches Ensemble.",
      ordre: 5,
      publishedAt: new Date().toISOString(),
    },
  ],
};

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Seed uniquement si les collections sont vides
    const articleCount = await strapi
      .documents('api::article.article')
      .count({});
    if (articleCount === 0) {
      for (const data of seedData.articles) {
        await strapi.documents('api::article.article').create({ data });
      }
      strapi.log.info('[seed] Articles insérés');
    }

    const membreCount = await strapi
      .documents('api::membre-equipe.membre-equipe')
      .count({});
    if (membreCount === 0) {
      for (const data of seedData.membresEquipe) {
        await strapi
          .documents('api::membre-equipe.membre-equipe')
          .create({ data });
      }
      strapi.log.info('[seed] Membres équipe insérés');
    }

    const etapeCount = await strapi
      .documents('api::etape-accueil.etape-accueil')
      .count({});
    if (etapeCount === 0) {
      for (const data of seedData.etapesAccueil) {
        await strapi
          .documents('api::etape-accueil.etape-accueil')
          .create({ data });
      }
      strapi.log.info('[seed] Étapes accueil insérées');
    }

    // Single type — vérifie si le champ recit est vide (single type retourne null si non créé)
    const historiqueExisting = await strapi
      .documents('api::historique.historique')
      .findFirst({});
    if (!historiqueExisting) {
      await strapi
        .documents('api::historique.historique')
        .create({ data: seedData.historique });
      strapi.log.info('[seed] Historique inséré');
    }

    const friseCount = await strapi
      .documents('api::frise-historique.frise-historique')
      .count({});
    if (friseCount === 0) {
      for (const data of seedData.friseHistorique) {
        await strapi
          .documents('api::frise-historique.frise-historique')
          .create({ data });
      }
      strapi.log.info('[seed] Frise historique insérée');
    }
  },
};
