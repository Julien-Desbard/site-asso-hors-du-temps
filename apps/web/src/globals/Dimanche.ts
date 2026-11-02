import type { GlobalConfig } from 'payload';
import { revalidateGlobalChange } from '../hooks/revalidate.ts';
import { estAdmin, masquerHorsAdmin } from '../lib/acces.ts';

export const Dimanche: GlobalConfig = {
  slug: 'dimanche',
  admin: {
    hidden: masquerHorsAdmin,
  },
  access: {
    read: () => true,
    update: estAdmin,
  },
  hooks: {
    afterChange: [revalidateGlobalChange('dimanche')],
  },
  fields: [
    {
      name: 'flyer',
      type: 'upload',
      relationTo: 'media',
    },
  ],
};
