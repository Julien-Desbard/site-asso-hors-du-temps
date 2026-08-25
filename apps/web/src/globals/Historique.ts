import type { GlobalConfig } from 'payload';
import { revalidateGlobalChange } from '../hooks/revalidate.ts';

export const Historique: GlobalConfig = {
  slug: 'historique',
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
      required: true,
    },
  ],
};
