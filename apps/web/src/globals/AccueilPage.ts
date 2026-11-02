import type { GlobalConfig } from 'payload';
import { revalidateGlobalChange } from '../hooks/revalidate.ts';
import { estAdmin, masquerHorsAdmin } from '../lib/acces.ts';

export const AccueilPage: GlobalConfig = {
  slug: 'accueil-page',
  label: 'Page Être accueilli',
  admin: {
    hidden: masquerHorsAdmin,
  },
  access: {
    read: () => true,
    update: estAdmin,
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
