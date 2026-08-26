import type { GlobalConfig } from 'payload';
import { revalidateGlobalChange } from '../hooks/revalidate.ts';

export const Dimanche: GlobalConfig = {
  slug: 'dimanche',
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
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
