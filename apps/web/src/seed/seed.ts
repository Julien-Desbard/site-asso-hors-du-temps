import { getPayload } from 'payload';
import config from '../payload.config.ts';

// Contenu copié verbatim depuis l'ancien seed Strapi (apps/cms/, supprimé au cutover Payload).
const seedData = {
  historique: {
    recit: `L'Hors du temps a été créé sur une idée de Carole, qui a connu bien des galères, la précarité et a souhaité, avec son mari Bernard, trouver un lieu d'accueil pour que des personnes en difficulté de toutes sortes puissent se poser et qu'on "leur fiche la paix !", sans qu'on leur demande de s'inscrire dans un programme quelconque.

Séduit par ce projet, un propriétaire a proposé de louer sa grande maison pour un bail de très longue durée, située sur les côteaux de Saint-Marcellin, petite ville en Isère. La maison se situe à mi-chemin entre Grenoble et Valence dans la vallée du Sud-Grésivaudan, au pied des montagnes du Vercors.

Durant des années, Carole et Bernard ont accueilli de nombreuses personnes qui ont passé un temps plus ou moins long avec eux avant de reprendre leur route, de retrouver leur chemin...

Au décès de Carole, un autre couple est venu s'installer dans la maison de l'Hors du temps pour poursuivre ce généreux projet. Christine et Jean-Luc ont accueilli un grand nombre de personnes avec l'aide de salariés et de bénévoles pendant près de 5 ans. Ce sont maintenant Régine et Christian qui ont repris le flambeau courant 2026.`,
  },
  friseHistorique: [
    { annee: '2010', evenement: 'Fondation par Carole et Bernard', ordre: 1 },
    { annee: '2015', evenement: 'Équipe de bénévoles réguliers constituée', ordre: 2 },
    { annee: '2019', evenement: 'Lancement des Dimanches Ensemble', ordre: 3 },
    { annee: '2024', evenement: 'Nouveau rythme : un dimanche sur trois', ordre: 4 },
    { annee: '2026', evenement: 'Création du fonds de dotation & nouvelle équipe accueillante', ordre: 5 },
    { annee: '2027', evenement: 'Objectif : rachat de la maison', ordre: 6 },
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
    },
    {
      titre: 'Lettre aux adhérents — Avril 2026',
      slug: 'lettre-adherents-avril-2026',
      date: '2026-04-29',
      extrait:
        "L'aventure continue : une nouvelle équipe prend le relais avec enthousiasme. Rendez-vous à la prochaine assemblée générale.",
      lien_externe: null,
      a_la_une: false,
    },
    {
      titre: "Retour sur l'AG et les Dimanches ensemble",
      slug: 'retour-ag-dimanches-ensemble-2025',
      date: '2025-07-16',
      extrait: 'Un repas sous les arbres, un bal folk, des rires partagés. Merci à toutes et tous pour ces moments suspendus.',
      lien_externe: null,
      a_la_une: false,
    },
  ],
  membresEquipe: [
    {
      prenom: 'Marie',
      role: 'Accueillante principale',
      presentation:
        "C'est une rencontre lors d'un dimanche ensemble qui l'a amenée à rejoindre l'association. Elle coordonne les séjours et veille à ce que chacun trouve sa place à la maison.",
      ordre: 1,
    },
    {
      prenom: 'Jean-Pierre',
      role: 'Jardinier bénévole',
      presentation:
        'Retraité passionné de jardinage, il entretient le potager et les espaces verts. Le jardin est pour lui un lieu de transmission et de partage silencieux.',
      ordre: 2,
    },
    {
      prenom: 'Sylvie',
      role: 'Bénévole cuisine et animation',
      presentation:
        'Cuisinière du cœur, elle prépare les repas partagés et anime les Dimanches Ensemble avec une énergie contagieuse.',
      ordre: 3,
    },
  ],
  etapesAccueil: [
    {
      titre: 'Prendre contact',
      tag: 'on vous écoute',
      description:
        "Appelez-nous sur les heures de bureau au 07 48 10 19 94 afin de nous expliquer votre situation et votre besoin (évitez les heures de repas SVP). Après réflexion en équipe, nous vous recontacterons pour convenir d'un rendez-vous en présentiel, à St Marcellin, si votre demande semble cohérente avec le projet de l'association.",
      ordre: 1,
    },
    {
      titre: 'Faire connaissance',
      tag: 'sans jugement',
      description:
        "Le rendez-vous dure 1h environ sur place. Nous vous présenterons le fonctionnement de la maison, et vous nous expliquerez plus en détail ce qui vous pousse à demander un séjour de répit à l'Hors du Temps. Après cela, vous pourrez nous rappeler 2 jours plus tard pour confirmer ou infirmer votre demande de séjour. Ces 48 heures nous permettront à nous aussi de statuer sur votre demande.",
      ordre: 2,
    },
    {
      titre: 'Préparer le séjour',
      tag: 'à votre rythme',
      description:
        "On fixe ensemble les dates et durée du séjour suivant nos contraintes respectives. On part toujours sur une période courte, qui se prolonge au fur et à mesure, même pour les séjours longs.",
      ordre: 3,
    },
    {
      titre: 'Le séjour à la maison',
      tag: 'bienvenue',
      description: "On vous accueille le jour J pour un répit ressourçant. Voir ci-dessous les règles de vie commune qui sont les nôtres.",
      ordre: 4,
    },
  ],
  accueilPage: {
    vie_commune_texte: `Les repas de midi et du soir se prennent ensemble. Le petit déjeuner est en libre-service. Une participation à la réalisation des repas, à la vaisselle ou au nettoyage est demandée. Chaque personne accueillie est invitée à participer selon ses aptitudes et possibilités, à la vie de la maison, environ 2h par jour. Frais de séjour : un forfait de 10 euros/jour est payable par quinzaine. Vous aurez une chambre individuelle avec cabinet de toilette (WC et douche). Il appartient au résident d'en faire le ménage. Il est possible de participer à de petits travaux d'entretien de la maison ou du jardin si vous le souhaitez, à voir avec les responsables de maison. En fonction de votre situation, les démarches administratives, de santé… peuvent se poursuivre pendant votre séjour. L'équipe d'accueil de l'Hors du temps fait en sorte de vous soutenir (sans se substituer aux professionnels déjà engagés auprès de vous). Nous sommes à l'écoute des personnes, de leur bien-être mais nous les laissons avancer à leur rythme, sans poser de questions. Les personnes accueillies font les démarches qu'elles jugent nécessaires en dehors de la maison. Les services sociaux ou médicaux de St Marcellin peuvent prendre le relais si nécessaire.`,
    activites_texte: 'Texte à venir.',
  },
  parametre: {
    don_fonctionnement_url: 'https://www.helloasso.com/associations/l-hors-du-temps/formulaires/2',
    don_fonds_dotation_url: 'https://www.helloasso.com/associations/l-hors-du-temps/formulaires/2',
    benevolat_url: 'https://www.jeveuxaider.gouv.fr/organisations/18543-ensemble-pour-l-hors-du-temps',
    facebook_url: 'https://www.facebook.com/people/Association-lHors-du-temps/61583118786303/',
    mecenat_url: 'https://www.tousbenevoles.org',
  },
};

export async function seed() {
  const payload = await getPayload({ config });

  const { totalDocs: articleCount } = await payload.count({ collection: 'articles' });
  if (articleCount === 0) {
    for (const data of seedData.articles) {
      await payload.create({ collection: 'articles', data, draft: false });
    }
    payload.logger.info('[seed] Articles insérés');
  }

  const { totalDocs: membreCount } = await payload.count({ collection: 'membre-equipe' });
  if (membreCount === 0) {
    for (const data of seedData.membresEquipe) {
      await payload.create({ collection: 'membre-equipe', data, draft: false });
    }
    payload.logger.info('[seed] Membres équipe insérés');
  }

  const { totalDocs: etapeCount } = await payload.count({ collection: 'etape-accueil' });
  if (etapeCount === 0) {
    for (const data of seedData.etapesAccueil) {
      await payload.create({ collection: 'etape-accueil', data, draft: false });
    }
    payload.logger.info('[seed] Étapes accueil insérées');
  }

  const { totalDocs: friseCount } = await payload.count({ collection: 'frise-historique' });
  if (friseCount === 0) {
    for (const data of seedData.friseHistorique) {
      await payload.create({ collection: 'frise-historique', data, draft: false });
    }
    payload.logger.info('[seed] Frise historique insérée');
  }

  const historique = await payload.findGlobal({ slug: 'historique' });
  if (!historique.recit) {
    await payload.updateGlobal({ slug: 'historique', data: seedData.historique, draft: false });
    payload.logger.info('[seed] Historique inséré');
  }

  const parametre = await payload.findGlobal({ slug: 'parametre' });
  if (!parametre.don_fonctionnement_url) {
    await payload.updateGlobal({ slug: 'parametre', data: seedData.parametre });
    payload.logger.info('[seed] Paramètres insérés');
  }

  const accueilPage = await payload.findGlobal({ slug: 'accueil-page' });
  if (!accueilPage.vie_commune_texte) {
    await payload.updateGlobal({ slug: 'accueil-page', data: seedData.accueilPage });
    payload.logger.info('[seed] Page Accueil insérée');
  }

  // dimanche reste vide : flyer uploadé à la main via l'admin.
}

const isMainModule = import.meta.url === new URL(process.argv[1] ?? '', 'file:').href;
if (isMainModule) {
  seed()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
