import type { GlobalConfig } from 'payload';
import { revalidateGlobalChange } from '../hooks/revalidate.ts';
import { estAdmin, masquerHorsAdmin } from '../lib/acces.ts';

export const BenevolatPage: GlobalConfig = {
  slug: 'benevolat-page',
  label: 'Page Bénévolat',
  admin: {
    hidden: masquerHorsAdmin,
  },
  access: {
    read: () => true,
    update: estAdmin,
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
