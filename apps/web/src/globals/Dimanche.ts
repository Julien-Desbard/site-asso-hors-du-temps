import type { GlobalConfig } from 'payload';
import { revalidateGlobalChange } from '../hooks/revalidate.ts';

export const Dimanche: GlobalConfig = {
  slug: 'dimanche',
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
