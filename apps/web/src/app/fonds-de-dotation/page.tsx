import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: "Fonds de dotation — Participez au rachat de la maison | L'Hors du Temps",
  description:
    "Le fonds de dotation « La maison Hors du Temps » : participez au rachat de la maison pour qu'elle reste un lieu de répit.",
};

export default function FondsDeDotationPage() {
  return (
    <>
      <PageHero
        scrib="Urgence 2027"
        title="Participez au rachat de la maison"
        lead="En 2027, la maison qui abrite l'Hors du Temps sera mise en vente. Pour qu'elle reste un lieu de répit, nous avons créé le fonds de dotation « La maison Hors du Temps ». Vous pouvez agir avec nous."
      />

      {/* LE PROJET */}
      <section className="section">
        <div className="wrap">
          <div className="flyer-block">
            <div className="prose">
              <h3>Pourquoi un fonds de dotation ?</h3>
              <p>Depuis 2010, la maison de Saint-Marcellin accueille celles et ceux qui ont besoin de souffler. <strong>En 2027, la propriété sera mise en vente.</strong> Pour ne pas perdre ce lieu unique, nous devons pouvoir le racheter.</p>
              <p>En février 2026, l&rsquo;association a créé le fonds de dotation <strong>« La maison Hors du Temps »</strong>. Il permet de collecter des dons dédiés au rachat, d&rsquo;accueillir le mécénat d&rsquo;entreprise et d&rsquo;ouvrir droit à des réductions fiscales.</p>
              <p>Chaque contribution, petite ou grande, nous rapproche du but : que la maison continue, longtemps, d&rsquo;être un endroit où se poser.</p>
            </div>
            <div className="flyer-ph">visuel du projet<br />(image à fournir)</div>
          </div>
        </div>
      </section>

      {/* AVANCÉE */}
      <section className="section section-cream">
        <div className="wrap">
          <div className="section-head">
            <span className="scrib scrib-teal" style={{ fontSize: 30, transform: 'rotate(-1.5deg)', display: 'inline-block' }}>Où en est-on ?</span>
            <h2>L&rsquo;avancée de la collecte</h2>
            <p className="intro">Première marche franchie avec enthousiasme. La mobilisation continue, palier après palier.</p>
          </div>
          <div className="stats">
            <div className="stat">
              <strong className="lnum">Étape 1</strong>
              <span>franchie — merci à vous !</span>
            </div>
            <div className="stat">
              <strong className="lnum">2027</strong>
              <span>échéance du rachat</span>
            </div>
            <div className="stat">
              <strong>66 %</strong>
              <span>de réduction d&rsquo;impôt sur votre don</span>
            </div>
          </div>
        </div>
      </section>

      {/* DON */}
      <section className="don-section">
        <div className="wrap">
          <div className="don-head">
            <span className="scrib" style={{ fontSize: 36, transform: 'rotate(-2deg)', color: '#ffd9b4', display: 'inline-block' }}>Chaque don compte</span>
            <h2>Soutenir le fonds de dotation</h2>
            <p>Aidez-nous à racheter la maison. Votre don ouvre droit à une réduction d&rsquo;impôt de 66 % (dans la limite prévue par la loi).</p>
          </div>
          <div className="don-grid" style={{ gridTemplateColumns: '1fr', maxWidth: 640, margin: '0 auto' }}>
            <div className="don-card don-card-dotation">
              <span className="don-badge">Urgence 2027</span>
              <span className="don-eyebrow">La maison Hors du Temps</span>
              <h3>Je participe au rachat de la maison</h3>
              <p>Un don ponctuel ou régulier, en quelques clics et en toute sécurité, directement au fonds de dotation.</p>
              <a
                className="btn btn-primary"
                href="https://www.helloasso.com/associations/l-hors-du-temps/formulaires/2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Faire un don au fonds de dotation →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* AUTRES FAÇONS */}
      <section className="section">
        <div className="wrap">
          <div className="duo">
            <div className="act-card">
              <span className="act-eyebrow">Entreprises</span>
              <h3>Mécénat &amp; compétences</h3>
              <p>Votre entreprise souhaite soutenir le projet ? Mécénat financier, en nature ou de compétences : parlons-en. Une mission d&rsquo;appui au fonds de dotation est ouverte.</p>
              <a className="btn btn-teal" href="/benevolat">En savoir plus →</a>
            </div>
            <div className="act-card act-card-brick">
              <span className="act-eyebrow">En parler autour de soi</span>
              <h3>Faire connaître le projet</h3>
              <p>Le bouche-à-oreille est précieux. Partagez cette page, parlez de la maison à vos proches, relayez l&rsquo;appel sur vos réseaux.</p>
              <a className="btn btn-primary" href="/nous-contacter">Nous contacter →</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
