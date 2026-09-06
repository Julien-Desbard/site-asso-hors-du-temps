import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('rend les coordonnées de l’association', () => {
    render(<Footer />);

    expect(screen.getByRole('link', { name: 'asso.horsdutemps@gmail.com' })).toHaveAttribute(
      'href',
      'mailto:asso.horsdutemps@gmail.com',
    );
    expect(screen.getByRole('link', { name: '07 48 10 19 94' })).toHaveAttribute(
      'href',
      'tel:+33748101994',
    );
    expect(screen.getByText('24 rue de la Fusilière, 38160 St Marcellin')).toBeInTheDocument();
  });

  it('rend les liens sociaux en nouvel onglet et sécurisés', () => {
    render(<Footer />);

    for (const nom of ['LinkedIn', 'Facebook']) {
      const lien = screen.getByRole('link', { name: nom });
      expect(lien).toHaveAttribute('target', '_blank');
      expect(lien).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  it('rend les liens légaux et l’année courante', () => {
    render(<Footer />);

    expect(screen.getByRole('link', { name: 'Mentions légales' })).toHaveAttribute(
      'href',
      '/mentions-legales',
    );
    expect(screen.getByRole('link', { name: 'Politique de confidentialité' })).toHaveAttribute(
      'href',
      '/confidentialite',
    );
    // Pas d'année en dur : le test resterait vert un an puis casserait tout seul.
    expect(
      screen.getByText(new RegExp(`${new Date().getFullYear()} — Association loi 1901`)),
    ).toBeInTheDocument();
  });
});
