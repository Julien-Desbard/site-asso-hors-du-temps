import type { CollectionConfig } from 'payload';
import { revalidateCollectionChange, revalidateCollectionDelete } from '../hooks/revalidate.ts';

export const EtapeAccueil: CollectionConfig = {
  slug: 'etape-accueil',
  labels: {
    singular: "Étape d'accueil",
    plural: "Étapes d'accueil",
  },
  admin: {
    useAsTitle: 'titre',
  },
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [revalidateCollectionChange('etape-accueil')],
    afterDelete: [revalidateCollectionDelete('etape-accueil')],
  },
  fields: [
    {
      name: 'titre',
      type: 'text',
      required: true,
    },
    {
      name: 'tag',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'ordre',
      type: 'number',
      required: true,
      min: 1,
    },
  ],
};
