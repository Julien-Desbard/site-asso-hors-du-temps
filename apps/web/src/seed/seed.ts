import { getPayload } from 'payload';
import config from '../payload.config.ts';
import { seedData } from './data.ts';

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

  const benevolatPage = await payload.findGlobal({ slug: 'benevolat-page' });
  if (!benevolatPage.note_manuscrite) {
    await payload.updateGlobal({ slug: 'benevolat-page', data: seedData.benevolatPage });
    payload.logger.info('[seed] Page Bénévolat insérée');
  }

  const { totalDocs: articlePresseCount } = await payload.count({ collection: 'article-presse' });
  if (articlePresseCount === 0) {
    for (const data of seedData.articlesPresse) {
      await payload.create({ collection: 'article-presse', data, draft: false });
    }
    payload.logger.info('[seed] Articles de presse insérés');
  }

  const { totalDocs: rapportCount } = await payload.count({ collection: 'rapport-activite' });
  if (rapportCount === 0) {
    for (const data of seedData.rapportsActivite) {
      await payload.create({ collection: 'rapport-activite', data, draft: false });
    }
    payload.logger.info('[seed] Rapports d\'activité insérés (sans fichier — à déposer)');
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
