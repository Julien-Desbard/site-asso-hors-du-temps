import type { GlobalConfig } from 'payload';
import { revalidateGlobalChange } from '../hooks/revalidate.ts';

export const Parametre: GlobalConfig = {
  slug: 'parametre',
  hooks: {
    afterChange: [revalidateGlobalChange('parametre')],
  },
  fields: [
    {
      name: 'don_fonctionnement_url',
      type: 'text',
    },
    {
      name: 'don_fonds_dotation_url',
      type: 'text',
    },
    {
      name: 'benevolat_url',
      type: 'text',
    },
    {
      name: 'facebook_url',
      type: 'text',
    },
    {
      name: 'mecenat_url',
      type: 'text',
    },
  ],
};
