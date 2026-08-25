import type { CollectionConfig } from 'payload';
import { revalidateCollectionChange, revalidateCollectionDelete } from '../hooks/revalidate.ts';

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'titre',
  },
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [revalidateCollectionChange('articles')],
    afterDelete: [revalidateCollectionDelete('articles')],
  },
  fields: [
    {
      name: 'titre',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      name: 'extrait',
      type: 'textarea',
      required: true,
      maxLength: 300,
    },
    {
      name: 'contenu',
      type: 'richText',
    },
    {
      name: 'image_principale',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'galerie',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
    },
    {
      name: 'lien_externe',
      type: 'text',
    },
    {
      name: 'a_la_une',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
};
