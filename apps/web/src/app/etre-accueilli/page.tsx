import type { Metadata } from 'next';
import Link from 'next/link';
import Callout from '@/components/Callout';
import PageHero from '@/components/PageHero';
import { getEtapesAccueil } from '@/lib/strapi';
import type { EtapeAccueil } from '@hors-du-temps/types';

export const metadata: Metadata = {
  title: "Être accueilli — L'Hors du Temps",
  description:
    "Comment se déroule un accueil à L'Hors du Temps : les étapes, de la prise de contact au séjour à la maison.",
};

const STATIC_STEPS: EtapeAccueil[] = [
  { id: 1, documentId: '1', titre: 'Prendre contact', tag: 'on vous écoute', description: "Vous, un proche ou un travailleur social nous appelez ou nous écrivez. On échange simplement sur votre situation et votre besoin de répit.", ordre: 1, publishedAt: null },
  { id: 2, documentId: '2', titre: 'Faire connaissance', tag: 'sans jugement', description: "Un temps d'échange, par téléphone ou sur place, permet de se rencontrer, de présenter la maison et de vérifier ensemble que l'accueil correspond à votre situation.", ordre: 2, publishedAt: null },
  { id: 3, documentId: '3', titre: 'Préparer le séjour', tag: 'à votre rythme', description: "On fixe ensemble les dates et la durée du séjour. On vous explique le fonctionnement de la maison et la vie quotidienne avec les autres.", ordre: 3, publishedAt: null },
  { id: 4, documentId: '4', titre: 'Le séjour à la maison', tag: 'bienvenue', description: "Vous êtes accueilli pour quelques jours : repos, repas partagés, jardin, balades, moments de calme. Vous participez à la vie commune autant que vous le souhaitez.", ordre: 4, publishedAt: null },
  { id: 5, documentId: '5', titre: 'Après le séjour', tag: 'on reste en lien', description: "À votre départ, on prend le temps d'un dernier échange. La porte reste ouverte : beaucoup reviennent, notamment lors des Dimanches Ensemble.", ordre: 5, publishedAt: null },
];

export default async function EtreAccueilliPage() {
  let steps: EtapeAccueil[] = STATIC_STEPS;
  try {
    const fetched = await getEtapesAccueil();
    if (fetched.length > 0) steps = fetched;
  } catch { /* Strapi indisponible */ }

  return (
    <>
      <PageHero
        scrib="Vous avez besoin de souffler"
        title="Être accueilli"
        lead="Vous traversez une période difficile et vous avez besoin de faire une halte ? La maison vous est ouverte pour quelques jours, le temps de reprendre pied. Voici comment cela se passe."
      />

      {/* INTRO */}
      <section className="section">
        <div className="wrap">
          <div className="prose">
            <p><strong>L&rsquo;Hors du Temps accueille pour quelques jours</strong> celles et ceux qui ont besoin de se poser : après une épreuve, un deuil, une fatigue profonde, un passage à vide. On y vient pour souffler, retrouver un rythme, du lien, et un peu de confiance.</p>
            <p>L&rsquo;accueil est gratuit et repose sur la confiance. Il n&rsquo;y a rien à prouver, rien à payer : juste à être là. La maison est un lieu de vie partagé, en lien avec d&rsquo;autres personnes accueillies et avec les bénévoles.</p>
          </div>
        </div>
      </section>

      {/* PROCESSUS */}
      <section className="section section-cream">
        <div className="wrap">
          <div className="section-head">
            <span className="scrib scrib-teal" style={{ fontSize: 30, transform: 'rotate(-1.5deg)', display: 'inline-block' }}>Pas à pas</span>
            <h2>Comment se déroule un accueil</h2>
            <p className="intro">Du premier contact au retour chez soi, chaque étape se fait en douceur, à votre rythme.</p>
          </div>
          <div className="steps">
            {steps.map((step, i) => (
              <div key={step.id} className="step">
                <span className="step-tag">{step.tag}</span>
                <div className="step-num lnum">{i + 1}</div>
                <h3>{step.titre}</h3>
                <p>{step.description}</p>
              </div>
            ))}
            {/* carte question */}
            <div className="step" style={{ background: 'var(--cream-warm)', borderStyle: 'dashed' }}>
              <div className="step-num lnum" style={{ color: 'var(--brick)' }}>?</div>
              <h3>Une question ?</h3>
              <p>Le moindre doute, la moindre hésitation ? Écrivez-nous, on vous répond avec plaisir et sans engagement.</p>
              <Link className="btn btn-primary" href="/nous-contacter" style={{ marginTop: 14, alignSelf: 'flex-start' }}>Nous contacter</Link>
            </div>
          </div>
        </div>
      </section>

      <Callout
        title="Envie de faire une halte ?"
        text="Parlons-en, simplement. Un message suffit pour commencer — nous vous répondrons dès que possible."
        ctaLabel="Prendre contact"
        ctaHref="/nous-contacter"
      />
    </>
  );
}
