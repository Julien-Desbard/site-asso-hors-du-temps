import { describe, it, expect } from 'vitest';
import { formaterMoisAnnee, idVideoYoutube } from './presse';

describe('formaterMoisAnnee', () => {
  it('affiche le mois en toutes lettres et l’année', () => {
    expect(formaterMoisAnnee('2026-03-12T00:00:00.000Z')).toBe('mars 2026');
  });

  it('lit la date en UTC (pas de bascule au mois précédent)', () => {
    expect(formaterMoisAnnee('2026-02-01T00:00:00.000Z')).toBe('février 2026');
  });
});

describe('idVideoYoutube', () => {
  it.each([
    ['https://youtu.be/HY8Aqehxe2Y?si=DzxzT9XbSFgoYD-H', 'HY8Aqehxe2Y'],
    ['https://www.youtube.com/watch?v=gtSHy1cFmv4&t=10s', 'gtSHy1cFmv4'],
    ['https://m.youtube.com/watch?v=gtSHy1cFmv4', 'gtSHy1cFmv4'],
    ['https://youtube.com/shorts/gtSHy1cFmv4', 'gtSHy1cFmv4'],
    ['https://www.youtube.com/embed/gtSHy1cFmv4', 'gtSHy1cFmv4'],
    ['https://www.youtube.com/live/gtSHy1cFmv4', 'gtSHy1cFmv4'],
    ['https://www.youtube-nocookie.com/embed/gtSHy1cFmv4', 'gtSHy1cFmv4'],
  ])('%s → %s', (lien, attendu) => {
    expect(idVideoYoutube(lien)).toBe(attendu);
  });

  it.each([
    'https://www.rcf.fr/ecologie-et-solidarite/unissons?episode=626570',
    'https://www.youtube.com/watch',
    'https://www.youtube.com/@chaine',
    'https://www.youtube.com/channel/UCabc',
    'https://youtu.be/',
    'https://youtu.be/trop-court',
    'https://youtu.be/"><script>',
    'pas une url',
  ])('renvoie null pour %s', (lien) => {
    expect(idVideoYoutube(lien)).toBeNull();
  });
});
