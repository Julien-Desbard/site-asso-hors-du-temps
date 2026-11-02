import { describe, it, expect } from 'vitest';
import type { Media } from '../payload-types.ts';
import { enParagraphes, formaterEuros, remplissageThermometre, urlPhoto } from './fonds';

describe('remplissageThermometre', () => {
  it.each([
    [130000, 100000, 57],
    [0, 100000, 0],
    [100000, 0, 100],
    [0, 0, 0],
    [-5, 10, 0],
  ])('%i récoltés + %i d’objectif → %i %%', (recolte, objectif, attendu) => {
    expect(remplissageThermometre(recolte, objectif)).toBe(attendu);
  });
});

describe('formaterEuros', () => {
  it('sépare les milliers et colle le symbole euro avec des espaces insécables', () => {
    expect(formaterEuros(130000)).toBe('130 000 €');
    expect(formaterEuros(950)).toBe('950 €');
  });
});

describe('urlPhoto', () => {
  const media = { url: 'https://blob/photo-hd.jpg' } as Media;

  it('préfère la photo déposée dans l’admin', () => {
    expect(urlPhoto(media, '/fonds/defaut.jpg')).toBe('https://blob/photo-hd.jpg');
  });

  it.each([
    ['aucun dépôt', null],
    ['id non peuplé', 12],
    ['média sans url', {} as Media],
  ])('retombe sur la photo par défaut (%s)', (_cas, upload) => {
    expect(urlPhoto(upload, '/fonds/defaut.jpg')).toBe('/fonds/defaut.jpg');
  });

  it('renvoie null sans photo du tout', () => {
    expect(urlPhoto(undefined, '')).toBeNull();
    expect(urlPhoto(undefined, undefined)).toBeNull();
  });
});

describe('enParagraphes', () => {
  it('découpe sur les lignes vides et ignore les blancs', () => {
    expect(enParagraphes('Un.\n\nDeux.\n  \n\nTrois.')).toEqual(['Un.', 'Deux.', 'Trois.']);
  });

  it('renvoie une liste vide pour un texte absent', () => {
    expect(enParagraphes(null)).toEqual([]);
  });
});
