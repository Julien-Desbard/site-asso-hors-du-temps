import type { CollectionConfig } from 'payload';
import { revalidateCollectionChange, revalidateCollectionDelete } from '../hooks/revalidate.ts';

export const FriseHistorique: CollectionConfig = {
  slug: 'frise-historique',
  admin: {
    useAsTitle: 'evenement',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
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
