import type { GlobalConfig } from 'payload';
import { revalidateGlobalChange } from '../hooks/revalidate.ts';
import { estAdmin, masquerHorsAdmin } from '../lib/acces.ts';

export const Parametre: GlobalConfig = {
  slug: 'parametre',
  label: 'Paramètres',
  admin: {
    hidden: masquerHorsAdmin,
  },
  access: {
    read: () => true,
    update: estAdmin,
  },
  hooks: {
    afterChange: [revalidateGlobalChange('parametre')],
  },
  fields: [
    {
      name: 'don_fonctionnement_url',
      type: 'text',
      label: 'URL don fonctionnement',
    },
    {
      name: 'don_fonds_dotation_url',
      type: 'text',
      label: 'URL fonds de dotation',
    },
    {
      name: 'benevolat_url',
      type: 'text',
      label: 'URL bénévolat',
    },
    {
      name: 'facebook_url',
      type: 'text',
      label: 'URL Facebook',
    },
    {
      name: 'mecenat_url',
      type: 'text',
      label: 'URL mécénat',
    },
  ],
};
