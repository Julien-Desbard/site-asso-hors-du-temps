import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VideoYoutube from './VideoYoutube';

describe('VideoYoutube', () => {
  it('n’affiche que la miniature tant que le visiteur n’a pas cliqué (pas d’iframe YouTube)', () => {
    const { container } = render(<VideoYoutube id="gtSHy1cFmv4" titre="Présentation" />);

    expect(screen.getByRole('button', { name: 'Lire la vidéo : Présentation' })).toBeInTheDocument();
    expect(container.querySelector('iframe')).toBeNull();
    expect(container.querySelector('img')?.getAttribute('src')).toContain('gtSHy1cFmv4');
  });

  it('charge le lecteur youtube-nocookie au clic', async () => {
    const { container } = render(<VideoYoutube id="gtSHy1cFmv4" titre="Présentation" />);

    await userEvent.click(screen.getByRole('button'));

    const iframe = container.querySelector('iframe');
    expect(iframe?.getAttribute('src')).toBe('https://www.youtube-nocookie.com/embed/gtSHy1cFmv4?autoplay=1');
    expect(iframe?.getAttribute('title')).toBe('Présentation');
    expect(screen.queryByRole('button')).toBeNull();
  });
});
