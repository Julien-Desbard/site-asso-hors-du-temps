import { describe, it, expect, vi } from 'vitest';
import { revalidateTag } from 'next/cache';
import {
  revalidateCollectionChange,
  revalidateCollectionDelete,
  revalidateGlobalChange,
} from './revalidate';

vi.mock('next/cache', () => ({ revalidateTag: vi.fn() }));

const doc = { id: 1, titre: 'Un article' };

describe('hooks de revalidation', () => {
  it.each([
    ['revalidateCollectionChange', revalidateCollectionChange],
    ['revalidateCollectionDelete', revalidateCollectionDelete],
    ['revalidateGlobalChange', revalidateGlobalChange],
  ])('%s invalide son tag et renvoie le document', async (_nom, fabrique) => {
    // Les 3 fabriques partagent la même signature utile ({ doc }) ; le cast évite de
    // reconstruire les contextes Payload complets, distincts pour chaque type de hook.
    const hook = fabrique('mon-tag') as (args: { doc: unknown }) => unknown;

    const resultat = await hook({ doc });

    expect(revalidateTag).toHaveBeenCalledExactlyOnceWith('mon-tag');
    expect(resultat).toBe(doc);
  });
});
