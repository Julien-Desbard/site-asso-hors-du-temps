import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Callout from './Callout';

describe('Callout', () => {
  it('rend le titre, le texte et le lien d’appel à l’action', () => {
    render(
      <Callout
        title="Nous soutenir"
        text="Chaque don compte."
        ctaLabel="Faire un don"
        ctaHref="/benevolat"
      />,
    );

    expect(screen.getByRole('heading', { name: 'Nous soutenir' })).toBeInTheDocument();
    expect(screen.getByText('Chaque don compte.')).toBeInTheDocument();

    const lien = screen.getByRole('link', { name: 'Faire un don' });
    expect(lien).toHaveAttribute('href', '/benevolat');
  });
});
