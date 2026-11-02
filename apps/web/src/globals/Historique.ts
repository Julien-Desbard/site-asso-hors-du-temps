import type { GlobalConfig } from 'payload';
import { revalidateGlobalChange } from '../hooks/revalidate.ts';
import { estAdmin, masquerHorsAdmin } from '../lib/acces.ts';

export const Historique: GlobalConfig = {
  slug: 'historique',
  admin: {
    hidden: masquerHorsAdmin,
  },
  access: {
    read: () => true,
    update: estAdmin,
  },
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [revalidateGlobalChange('historique')],
  },
  fields: [
    {
      name: 'recit',
      type: 'textarea',
      label: 'Récit',
      required: true,
    },
  ],
};
