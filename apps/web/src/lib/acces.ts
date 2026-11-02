// Règles d'accès de l'admin Payload selon le rôle du compte connecté.
//
// - `admin`  : gère tout le site.
// - `fonds`  : gère uniquement la page Fonds de dotation (et peut déposer des images).
//
// Les règles sont « fermées par défaut » : un compte sans rôle reconnu n'a que les
// droits communs à tous les comptes connectés.
import type { ClientUser } from 'payload';

// Forme minimale lue par ces règles. `role` est facultatif pour accepter aussi bien
// l'utilisateur serveur (typé) que `ClientUser` (index signature) côté admin.
type Utilisateur = { role?: string | null } | ClientUser | null | undefined;

interface AvecUtilisateur {
  req: { user?: Utilisateur };
}

export const ROLES = [
  { label: 'Administrateur (tout le site)', value: 'admin' },
  { label: 'Fonds de dotation uniquement', value: 'fonds' },
] as const;

export const estAdmin = ({ req: { user } }: AvecUtilisateur) => user?.role === 'admin';

export const estConnecte = ({ req: { user } }: AvecUtilisateur) => Boolean(user);

/** Le compte peut modifier la page Fonds de dotation. */
export const gereFonds = ({ req: { user } }: AvecUtilisateur) =>
  user?.role === 'admin' || user?.role === 'fonds';

/** Masque une collection / un global dans le menu de l'admin pour les non-admins. */
export const masquerHorsAdmin = ({ user }: { user?: Utilisateur }) =>
  user?.role !== 'admin';
