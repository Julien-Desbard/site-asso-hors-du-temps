import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PageHero from './PageHero';

describe('PageHero', () => {
  it('rend le titre seul quand les props optionnelles sont absentes', () => {
    const { container } = render(<PageHero title="Qui sommes-nous" />);

    expect(screen.getByRole('heading', { level: 1, name: 'Qui sommes-nous' })).toBeInTheDocument();
    expect(container.querySelector('.scrib')).toBeNull();
    expect(container.querySelector('.lead')).toBeNull();
    expect(container.querySelector('.grid')).toBeNull();
  });

  it('rend le scrib, le chapô et applique les modificateurs', () => {
    const { container } = render(
      <PageHero scrib="Notre histoire" scribGap title="Titre" lead="Un chapô." tightBottom />,
    );

    expect(screen.getByText('Notre histoire')).toBeInTheDocument();
    expect(screen.getByText('Un chapô.')).toBeInTheDocument();
    expect(container.querySelector('.scrib')).toHaveClass('scribWide');
    expect(container.querySelector('.hero')).toHaveClass('heroTightBottom');
  });

  it('utilise la variante manuscrite du titre quand titleVariant vaut "hand"', () => {
    render(<PageHero title="Bénévolat" titleVariant="hand" />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveClass('titleHand');
  });

  it('utilise la variante serif par défaut', () => {
    render(<PageHero title="Bénévolat" />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveClass('title');
  });

  it('bascule en grille à deux colonnes quand un aside est fourni', () => {
    const { container } = render(
      <PageHero title="Titre" aside={<aside>Encart</aside>} />,
    );

    expect(container.querySelector('.grid')).not.toBeNull();
    expect(screen.getByText('Encart')).toBeInTheDocument();
  });
});
