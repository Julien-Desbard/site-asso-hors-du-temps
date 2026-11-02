import type { CollectionConfig } from 'payload';
import { revalidateCollectionChange, revalidateCollectionDelete } from '../hooks/revalidate.ts';
import { estAdmin, masquerHorsAdmin } from '../lib/acces.ts';

export const ArticlePresse: CollectionConfig = {
  slug: 'article-presse',
  labels: {
    singular: 'Article de presse',
    plural: 'Articles de presse',
  },
  admin: {
    hidden: masquerHorsAdmin,
    useAsTitle: 'titre',
    defaultColumns: ['titre', 'source', 'date'],
  },
  // Ordre d'affichage sur le site : du plus récent au plus ancien.
  defaultSort: '-date',
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
      name: 'date',
      type: 'date',
      label: 'Date de parution',
      required: true,
      admin: {
        date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMMM yyyy' },
        description: 'Sert à classer les articles, du plus récent au plus ancien. Le site affiche le mois et l’année.',
      },
    },
    {
      name: 'lien',
      type: 'text',
      label: 'Lien externe',
      required: true,
      admin: {
        description: 'Un lien YouTube (youtu.be/… ou youtube.com/watch?v=…) affiche la vidéo directement sur le site.',
      },
    },
  ],
};
