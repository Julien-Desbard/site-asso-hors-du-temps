import type { CollectionConfig } from 'payload';
import { revalidateCollectionChange, revalidateCollectionDelete } from '../hooks/revalidate.ts';

export const ArticlePresse: CollectionConfig = {
  slug: 'article-presse',
  labels: {
    singular: 'Article de presse',
    plural: 'Articles de presse',
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
    afterChange: [revalidateCollectionChange('article-presse')],
    afterDelete: [revalidateCollectionDelete('article-presse')],
  },
  fields: [
    {
      name: 'titre',
      type: 'text',
      required: true,
    },
    {
      name: 'source',
      type: 'text',
      label: 'Média / source',
      required: true,
    },
    {
      name: 'annee',
      type: 'text',
      label: 'Année',
      required: true,
    },
    {
      name: 'lien',
      type: 'text',
      label: 'Lien externe',
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
