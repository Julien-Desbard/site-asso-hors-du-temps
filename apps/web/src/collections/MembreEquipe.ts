import type { CollectionConfig } from 'payload';
import { revalidateCollectionChange, revalidateCollectionDelete } from '../hooks/revalidate.ts';

export const MembreEquipe: CollectionConfig = {
  slug: 'membre-equipe',
  labels: {
    singular: "Membre de l'équipe",
    plural: "Membres de l'équipe",
  },
  admin: {
    useAsTitle: 'prenom',
  },
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [revalidateCollectionChange('membre-equipe')],
    afterDelete: [revalidateCollectionDelete('membre-equipe')],
  },
  fields: [
    {
      name: 'prenom',
      type: 'text',
      label: 'Prénom',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      label: 'Rôle',
      required: true,
    },
    {
      name: 'presentation',
      type: 'textarea',
      label: 'Présentation',
      required: true,
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'ordre',
      type: 'number',
      defaultValue: 0,
      min: 0,
    },
  ],
};
