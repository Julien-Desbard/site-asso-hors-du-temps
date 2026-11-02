import type { CollectionConfig } from 'payload';
import { revalidateCollectionChange, revalidateCollectionDelete } from '../hooks/revalidate.ts';
import { estAdmin, masquerHorsAdmin } from '../lib/acces.ts';

export const FriseHistorique: CollectionConfig = {
  slug: 'frise-historique',
  admin: {
    hidden: masquerHorsAdmin,
    useAsTitle: 'evenement',
  },
  access: {
    read: () => true,
    create: estAdmin,
    update: estAdmin,
    delete: estAdmin,
  },
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [revalidateCollectionChange('frise-historique')],
    afterDelete: [revalidateCollectionDelete('frise-historique')],
  },
  fields: [
    {
      name: 'annee',
      type: 'text',
      label: 'Année',
      required: true,
    },
    {
      name: 'evenement',
      type: 'text',
      label: 'Événement',
      required: true,
    },
    {
      name: 'ordre',
      type: 'number',
      defaultValue: 0,
      min: 0,
    },
  ],
};
