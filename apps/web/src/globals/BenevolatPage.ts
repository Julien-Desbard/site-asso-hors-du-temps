import type { GlobalConfig } from 'payload';
import { revalidateGlobalChange } from '../hooks/revalidate.ts';

export const BenevolatPage: GlobalConfig = {
  slug: 'benevolat-page',
  label: 'Page Bénévolat',
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    afterChange: [revalidateGlobalChange('benevolat-page')],
  },
  fields: [
    {
      name: 'note_manuscrite',
      type: 'textarea',
      label: 'Encart manuscrit (colonne de droite)',
    },
  ],
};
