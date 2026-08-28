import type { CollectionConfig } from 'payload';
import { revalidateCollectionChange, revalidateCollectionDelete } from '../hooks/revalidate.ts';

export const RapportActivite: CollectionConfig = {
  slug: 'rapport-activite',
  labels: {
    singular: "Rapport d'activité",
    plural: "Rapports d'activité",
  },
  admin: {
    useAsTitle: 'titre',
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
    afterChange: [revalidateCollectionChange('rapport-activite')],
    afterDelete: [revalidateCollectionDelete('rapport-activite')],
  },
  fields: [
    {
      name: 'annee',
      type: 'text',
      label: 'Année',
      required: true,
    },
    {
      name: 'titre',
      type: 'text',
      required: true,
    },
    {
      name: 'note',
      type: 'text',
      label: 'Précision (ex. "PDF · 4 pages")',
    },
    {
      name: 'fichier',
      type: 'upload',
      relationTo: 'media',
      label: 'Fichier PDF (laisser vide en attendant le dépôt du document)',
    },
    {
      name: 'ordre',
      type: 'number',
      defaultValue: 0,
      min: 0,
    },
  ],
};
