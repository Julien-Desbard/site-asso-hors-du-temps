import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: { useAsTitle: 'email' },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user }, id }) => user != null && user.id === id,
    delete: ({ req: { user }, id }) => user != null && user.id === id,
  },
  fields: [],
};
