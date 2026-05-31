import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: "Mentions légales",
  robots: { index: false },
};

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHero scrib="Transparence" title="Mentions légales" />
      <section className="section">
        <div className="wrap">
          <div className="prose">
            <h3>Éditeur du site</h3>
            <p>Association <strong>Ensemble pour l&rsquo;Hors du Temps</strong> — association loi 1901<br />
              24 rue de la Fusilière, 38160 Saint-Marcellin<br />
              Courriel : <a href="mailto:asso.horsdutemps@gmail.com" style={{ color: 'var(--brick)' }}>asso.horsdutemps@gmail.com</a><br />
              Téléphone : <a href="tel:+33748101994" style={{ color: 'var(--brick)' }}>07 48 10 19 94</a>
            </p>

            <h3>Hébergement</h3>
            <p>Site hébergé sur <strong>Vercel Inc.</strong>, 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis.</p>

            <h3>Propriété intellectuelle</h3>
            <p>L&rsquo;ensemble des contenus (textes, images, logos) présents sur ce site est la propriété exclusive de l&rsquo;association ou de ses partenaires. Toute reproduction sans autorisation est interdite.</p>

            <h3>Responsabilité</h3>
            <p>L&rsquo;association s&rsquo;efforce de maintenir les informations de ce site à jour. Elle ne saurait être tenue responsable des erreurs ou omissions éventuelles.</p>
          </div>
        </div>
      </section>
    </>
  );
}
