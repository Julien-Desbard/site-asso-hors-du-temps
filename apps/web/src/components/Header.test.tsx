import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';

// `PathnameContext` est créé avec `createContext(null)` : hors du routeur Next,
// `usePathname()` renvoie `null` et aucun lien ne serait jamais actif. Le mock est
// donc obligatoire pour tester la mise en évidence du lien courant.
const { pathnameMock } = vi.hoisted(() => ({ pathnameMock: vi.fn<() => string>() }));
vi.mock('next/navigation', () => ({ usePathname: pathnameMock }));

// `next/image` et `next/link` fonctionnent tels quels : Image retombe sur la config
// d'images par défaut et rend un <img> ; Link appelle notre `onClick` avant son
// `if (!router) return`, donc le clic est sûr et la navigation court-circuitée.

// Sans routeur, `Link` laisse l'ancre suivre son comportement natif et jsdom
// journalise « Not implemented: navigation » sur chaque clic. On neutralise la
// navigation par défaut : les handlers React, attachés en bulle sur la racine,
// s'exécutent quand même.
const bloquerNavigation = (evenement: MouseEvent) => evenement.preventDefault();
beforeEach(() => document.addEventListener('click', bloquerNavigation));
afterEach(() => document.removeEventListener('click', bloquerNavigation));

function afficher(pathname = '/') {
  pathnameMock.mockReturnValue(pathname);
  return { user: userEvent.setup(), ...render(<Header />) };
}

describe('Header', () => {
  it('rend les 5 liens de navigation principale', () => {
    afficher();

    const nav = screen.getByRole('navigation', { name: 'Navigation principale' });
    expect(nav.querySelectorAll('a')).toHaveLength(5);
    expect(screen.getByRole('link', { name: 'Qui sommes-nous ?' })).toHaveAttribute(
      'href',
      '/qui-sommes-nous',
    );
  });

  it('marque comme actif le lien correspondant au pathname courant', () => {
    afficher('/benevolat');

    expect(screen.getByRole('link', { name: 'Bénévolat' })).toHaveClass('active');
    expect(screen.getByRole('link', { name: 'Actualités' })).not.toHaveClass('active');
  });

  it('n’active aucun lien sur une page hors navigation', () => {
    const { container } = afficher('/mentions-legales');

    expect(container.querySelectorAll('a.active')).toHaveLength(0);
  });

  it('rend les deux appels à l’action et le logo', () => {
    afficher();

    expect(screen.getByRole('link', { name: 'Nous contacter' })).toHaveAttribute(
      'href',
      '/nous-contacter',
    );
    expect(screen.getByRole('link', { name: 'Faire un don' })).toHaveAttribute('href', '/#don');
    expect(screen.getByAltText("L'Hors du Temps")).toBeInTheDocument();
  });

  it('ouvre puis referme le menu via le bouton', async () => {
    const { user, container } = afficher();

    const bouton = screen.getByRole('button', { name: 'Ouvrir le menu' });
    expect(bouton).toHaveAttribute('aria-expanded', 'false');

    await user.click(bouton);

    expect(container.querySelector('header')).toHaveClass('open');
    expect(screen.getByRole('button', { name: 'Fermer le menu' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );

    await user.click(screen.getByRole('button', { name: 'Fermer le menu' }));

    expect(container.querySelector('header')).not.toHaveClass('open');
  });

  it.each([
    ['Bénévolat', 'un lien de navigation'],
    ['Nous contacter', 'le bouton contact'],
    ['Faire un don', 'le bouton don'],
  ])('referme le menu quand on clique sur %s', async (nom) => {
    const { user, container } = afficher();

    await user.click(screen.getByRole('button', { name: 'Ouvrir le menu' }));
    expect(container.querySelector('header')).toHaveClass('open');

    await user.click(screen.getByRole('link', { name: nom }));

    expect(container.querySelector('header')).not.toHaveClass('open');
  });

  it('referme le menu quand on clique sur le logo', async () => {
    const { user, container } = afficher();

    await user.click(screen.getByRole('button', { name: 'Ouvrir le menu' }));
    await user.click(screen.getByAltText("L'Hors du Temps"));

    expect(container.querySelector('header')).not.toHaveClass('open');
  });
});
