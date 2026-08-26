import type { GlobalConfig } from 'payload';
import { revalidateGlobalChange } from '../hooks/revalidate.ts';

export const Historique: GlobalConfig = {
  slug: 'historique',
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
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
