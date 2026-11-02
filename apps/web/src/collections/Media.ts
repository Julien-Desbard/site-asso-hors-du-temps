import type { CollectionConfig } from 'payload';
import { estAdmin, estConnecte } from '../lib/acces.ts';

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Média',
    plural: 'Médias',
  },
  admin: {
    useAsTitle: 'filename',
  },
  access: {
    read: () => true,
    // Tout compte connecté (y compris « fonds ») peut déposer et retoucher des images ;
    // la suppression, qui casserait les pages qui les utilisent, reste aux admins.
    create: estConnecte,
    update: estConnecte,
    delete: estAdmin,
  },
  upload: {
    mimeTypes: ['image/*', 'application/pdf'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Texte alternatif',
    },
  ],
};
