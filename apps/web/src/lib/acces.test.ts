import { describe, it, expect } from 'vitest';
import { estAdmin, estConnecte, gereFonds, masquerHorsAdmin } from './acces';

const ADMIN = { role: 'admin' };
const FONDS = { role: 'fonds' };
const SANS_ROLE = { role: null };

const req = (user: { role: string | null } | null) => ({ req: { user } });

describe('règles d’accès par rôle', () => {
  it.each([
    ['admin', ADMIN, { estAdmin: true, estConnecte: true, gereFonds: true, masque: false }],
    ['fonds', FONDS, { estAdmin: false, estConnecte: true, gereFonds: true, masque: true }],
    ['sans rôle', SANS_ROLE, { estAdmin: false, estConnecte: true, gereFonds: false, masque: true }],
    ['visiteur', null, { estAdmin: false, estConnecte: false, gereFonds: false, masque: true }],
  ])('compte %s', (_nom, user, attendu) => {
    expect(estAdmin(req(user))).toBe(attendu.estAdmin);
    expect(estConnecte(req(user))).toBe(attendu.estConnecte);
    expect(gereFonds(req(user))).toBe(attendu.gereFonds);
    expect(masquerHorsAdmin({ user })).toBe(attendu.masque);
  });
});
