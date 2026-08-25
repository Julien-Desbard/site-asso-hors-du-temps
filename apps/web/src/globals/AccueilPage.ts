import type { GlobalConfig } from 'payload';
import { revalidateGlobalChange } from '../hooks/revalidate.ts';

export const AccueilPage: GlobalConfig = {
  slug: 'accueil-page',
  hooks: {
    afterChange: [revalidateGlobalChange('accueil-page')],
  },
  fields: [
    {
      name: 'vie_commune_texte',
      type: 'textarea',
    },
    {
      name: 'vie_commune_image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'activites_texte',
      type: 'textarea',
    },
  ],
};
