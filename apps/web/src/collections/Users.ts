import type { CollectionConfig } from 'payload';
import { ROLES, estAdmin, masquerHorsAdmin } from '../lib/acces.ts';

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Compte',
    plural: 'Comptes',
  },
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role'],
    // Un compte « fonds » n'a pas à voir la liste des comptes (son propre profil
    // reste accessible via le menu « Compte » de l'admin).
    hidden: masquerHorsAdmin,
  },
  access: {
    // Un admin voit tous les comptes ; les autres seulement le leur.
    read: ({ req: { user } }) => (user?.role === 'admin' ? true : user ? { id: { equals: user.id } } : false),
    create: estAdmin,
    // Chacun gère son propre compte ; un admin gère aussi ceux des autres (ex. le
    // compte « fonds » de Christine : changer son rôle, le supprimer).
    update: ({ req: { user }, id }) => user?.role === 'admin' || (user != null && user.id === id),
    delete: ({ req: { user }, id }) => user?.role === 'admin' || (user != null && user.id === id),
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      label: 'Rôle',
      options: [...ROLES],
      defaultValue: 'admin',
      required: true,
      // Dans le jeton de session : les règles d'accès le lisent sans requête en base.
      saveToJWT: true,
      access: {
        // Seul un admin attribue ou change un rôle (un compte « fonds » ne peut pas
        // s'auto-promouvoir en modifiant son propre profil).
        create: estAdmin,
        update: estAdmin,
      },
    },
  ],
};
