import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import BreadcrumbJsonLd from './BreadcrumbJsonLd';

// `BASE` est lu au niveau module (donc figé à l'import) et la CI définit
// NEXT_PUBLIC_SITE_URL globalement : on n'asserte ni sur `item`, ni sur l'URL de
// l'entrée « Accueil », seulement sur la structure, les positions et les libellés.
function lireSchema(conteneur: HTMLElement) {
  const script = conteneur.querySelector('script[type="application/ld+json"]');
  expect(script).not.toBeNull();
  return JSON.parse(script!.innerHTML);
}

describe('BreadcrumbJsonLd', () => {
  it('émet un BreadcrumbList avec Accueil en position 1', () => {
    const { container } = render(<BreadcrumbJsonLd items={[]} />);

    const schema = lireSchema(container);

    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('BreadcrumbList');
    expect(schema.itemListElement).toHaveLength(1);
    expect(schema.itemListElement[0]).toMatchObject({
      '@type': 'ListItem',
      position: 1,
      name: 'Accueil',
    });
  });

  it('numérote les éléments fournis à partir de la position 2', () => {
    const { container } = render(
      <BreadcrumbJsonLd
        items={[
          { name: 'Actualités', url: 'https://exemple.test/actualites' },
          { name: 'Un article', url: 'https://exemple.test/actualites/un-article' },
        ]}
      />,
    );

    const schema = lireSchema(container);

    expect(schema.itemListElement).toHaveLength(3);
    expect(
      schema.itemListElement.map((e: { position: number; name: string }) => [e.position, e.name]),
    ).toEqual([
      [1, 'Accueil'],
      [2, 'Actualités'],
      [3, 'Un article'],
    ]);
    // L'URL des éléments fournis, elle, vient des props : on peut l'asserter.
    expect(schema.itemListElement[2].item).toBe('https://exemple.test/actualites/un-article');
  });
});
