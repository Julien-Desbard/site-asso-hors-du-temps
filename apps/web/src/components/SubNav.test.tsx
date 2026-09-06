import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SubNav from './SubNav';

const items = [
  { id: 'histoire', label: 'Notre histoire' },
  { id: 'equipe', label: 'L’équipe' },
];

// Sous jsdom, `offsetTop` vaut toujours 0 : le scroll spy désigne mécaniquement la
// dernière section. On ne teste donc jamais *quel* lien est actif, seulement le rendu,
// l'abonnement au scroll et son nettoyage.
describe('SubNav', () => {
  it('rend un lien d’ancre par item', () => {
    render(<SubNav items={items} />);

    expect(screen.getByRole('navigation', { name: 'Navigation par section' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Notre histoire' })).toHaveAttribute('href', '#histoire');
    expect(screen.getByRole('link', { name: 'L’équipe' })).toHaveAttribute('href', '#equipe');
  });

  it('ne rend aucun lien pour une liste vide', () => {
    render(<SubNav items={[]} />);

    expect(screen.queryAllByRole('link')).toHaveLength(0);
  });

  it('ignore les ancres dont la section n’existe pas dans le document', () => {
    // Une seule des deux sections est présente : l'autre est filtrée par `.filter(Boolean)`.
    const section = document.createElement('section');
    section.id = 'histoire';
    document.body.appendChild(section);

    expect(() => render(<SubNav items={items} />)).not.toThrow();

    section.remove();
  });

  it('se désabonne du scroll au démontage', () => {
    const desabonnement = vi.spyOn(window, 'removeEventListener');

    const { unmount } = render(<SubNav items={items} />);
    unmount();

    expect(desabonnement).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
});
