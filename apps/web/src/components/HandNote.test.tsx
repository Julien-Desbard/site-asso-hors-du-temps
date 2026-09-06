import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HandNote from './HandNote';

describe('HandNote', () => {
  it('découpe le texte en un paragraphe par double saut de ligne', () => {
    const { container } = render(<HandNote text={'Premier para.\n\nDeuxième para.'} />);

    const paragraphes = container.querySelectorAll('p');
    expect(paragraphes).toHaveLength(2);
    expect(screen.getByText('Premier para.')).toBeInTheDocument();
    expect(screen.getByText('Deuxième para.')).toBeInTheDocument();
  });

  it('ignore les sauts de ligne surnuméraires et ne rend pas de paragraphe vide', () => {
    const { container } = render(<HandNote text={'Un.\n\n\n\nDeux.'} />);

    expect(container.querySelectorAll('p')).toHaveLength(2);
  });

  it('ne rend aucun paragraphe pour un texte vide', () => {
    const { container } = render(<HandNote text="" />);

    expect(container.querySelectorAll('p')).toHaveLength(0);
    expect(container.querySelector('.sheet')).not.toBeNull();
  });
});
