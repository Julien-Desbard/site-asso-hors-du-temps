import type { GlobalConfig } from 'payload';
import { revalidateGlobalChange } from '../hooks/revalidate.ts';

export const AccueilPage: GlobalConfig = {
  slug: 'accueil-page',
  label: "Page d'accueil",
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    afterChange: [revalidateGlobalChange('accueil-page')],
  },
  fields: [
    {
      name: 'vie_commune_texte',
      type: 'textarea',
      label: 'Texte vie commune',
    },
    {
      name: 'vie_commune_image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image vie commune',
    },
    {
      name: 'activites_texte',
      type: 'textarea',
      label: 'Texte activités',
    },
  ],
};
