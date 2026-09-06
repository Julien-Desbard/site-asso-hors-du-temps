import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { FieldHookArgs } from 'payload';
import { generateSlug } from './generateSlug';

// `slugify` n'est volontairement pas exporté : c'est un détail d'implémentation et
// toutes ses branches sont atteignables à travers le hook.

const findMock = vi.fn();

// `FieldHookArgs` compte une quinzaine de propriétés dont le hook n'en lit que
// quatre. On isole ici l'unique cast du fichier plutôt que de fabriquer un faux
// contexte Payload complet.
function creerArgs(partiel: {
  value?: unknown;
  siblingData?: Record<string, unknown>;
  originalDoc?: Record<string, unknown>;
}): FieldHookArgs {
  const req = { payload: { find: findMock } };
  return {
    value: partiel.value,
    siblingData: partiel.siblingData ?? {},
    originalDoc: partiel.originalDoc,
    req,
  } as unknown as FieldHookArgs;
}

beforeEach(() => {
  // Par défaut : aucun slug existant, donc pas de collision.
  findMock.mockResolvedValue({ totalDocs: 0 });
});

describe('generateSlug', () => {
  it('conserve un slug déjà rempli sans interroger la base', async () => {
    const resultat = await generateSlug(creerArgs({ value: 'slug-manuel' }));

    expect(resultat).toBe('slug-manuel');
    expect(findMock).not.toHaveBeenCalled();
  });

  it('renvoie la valeur telle quelle quand il n’y a aucun titre', async () => {
    const resultat = await generateSlug(creerArgs({ value: undefined }));

    expect(resultat).toBeUndefined();
    expect(findMock).not.toHaveBeenCalled();
  });

  it('translittère les accents et la ponctuation', async () => {
    // Slug attendu par e2e/actualites.spec.ts.
    const resultat = await generateSlug(
      creerArgs({ siblingData: { titre: 'Aidez-nous à racheter la maison !' } }),
    );

    expect(resultat).toBe('aidez-nous-a-racheter-la-maison');
  });

  it('remplace apostrophes, ponctuation et espaces multiples par un seul tiret', async () => {
    const resultat = await generateSlug(
      creerArgs({ siblingData: { titre: "L'Hors du Temps :  ça  déménage ?" } }),
    );

    expect(resultat).toBe('l-hors-du-temps-ca-demenage');
  });

  // Cas limite connu et non corrigé : un titre 100 % non-alphanumérique produit un
  // slug vide (le `!` devient '-', puis les tirets de bord sont supprimés). Payload
  // rejettera alors le champ requis — comportement acceptable en attendant un fix.
  it('produit un slug vide pour un titre sans aucun caractère alphanumérique', async () => {
    const resultat = await generateSlug(creerArgs({ siblingData: { titre: '!!! ???' } }));

    expect(resultat).toBe('');
  });

  it('lit le titre depuis originalDoc quand siblingData ne le porte pas', async () => {
    const resultat = await generateSlug(
      creerArgs({ siblingData: {}, originalDoc: { titre: 'Mon titre' } }),
    );

    expect(resultat).toBe('mon-titre');
  });

  it('incrémente le suffixe tant qu’un slug existe déjà', async () => {
    findMock
      .mockResolvedValueOnce({ totalDocs: 1 }) // 'mon-titre' pris
      .mockResolvedValueOnce({ totalDocs: 1 }) // 'mon-titre-2' pris
      .mockResolvedValueOnce({ totalDocs: 0 }); // 'mon-titre-3' libre

    const resultat = await generateSlug(creerArgs({ siblingData: { titre: 'Mon titre' } }));

    expect(resultat).toBe('mon-titre-3');
    expect(findMock).toHaveBeenCalledTimes(3);
    expect(findMock.mock.calls.map((appel) => appel[0].where.slug.equals)).toEqual([
      'mon-titre',
      'mon-titre-2',
      'mon-titre-3',
    ]);
  });

  it('s’exclut lui-même de la recherche de collision en mise à jour', async () => {
    await generateSlug(
      creerArgs({ siblingData: { titre: 'Mon titre' }, originalDoc: { id: 42 } }),
    );

    expect(findMock).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'articles',
        limit: 1,
        where: { slug: { equals: 'mon-titre' }, id: { not_equals: 42 } },
      }),
    );
  });

  it('n’ajoute pas de clause `id` à la création', async () => {
    await generateSlug(creerArgs({ siblingData: { titre: 'Mon titre' } }));

    expect(findMock.mock.calls[0][0].where).toEqual({ slug: { equals: 'mon-titre' } });
  });
});
