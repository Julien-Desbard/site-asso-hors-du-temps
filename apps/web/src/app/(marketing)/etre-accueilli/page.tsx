import type { Metadata } from 'next';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import Image from 'next/image';
import Link from 'next/link';
import Callout from '@/components/Callout';
import PageHero from '@/components/PageHero';
import SubNav from '@/components/SubNav';
import { getAccueilPage, getEtapesAccueil } from '@/lib/payload';

export const metadata: Metadata = {
  title: "Être accueilli — L'Hors du Temps",
  description:
    "Comment se déroule un accueil à L'Hors du Temps : les étapes, de la prise de contact au séjour à la maison.",
};

const SUBNAV = [
  { id: 'processus', label: 'Processus pour être accueilli' },
  { id: 'vie-commune', label: "La vie commune à l'Hors du temps" },
  { id: 'activites', label: 'Activités possibles à St Marcellin' },
];

export default async function EtreAccueilliPage() {
  const [steps, accueilPage] = await Promise.all([getEtapesAccueil(), getAccueilPage()]);

  const vieCommuneImage = typeof accueilPage?.vie_commune_image === 'object' ? accueilPage.vie_commune_image : null;
  const vieCommuneImageUrl = vieCommuneImage?.url ?? null;

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Être accueilli', url: 'https://assohorsdutemps.fr/etre-accueilli' }]} />
      <PageHero
        scrib="Vous avez besoin de souffler"
        scribGap
        tightBottom
        title="Être accueilli"
        lead="Vous traversez une période difficile et avez besoin de faire une halte ? Vous pouvez être accueilli à l'Hors du Temps pour une période courte si vous avez un logement (places pour 3 personnes, pour un minimum d'1 semaine) ou longue (places pour 2 personnes, pour un maximum de 6 mois). L'équipe d'accueil se compose en continu de 2 personnes (bénévoles ou salariées), les repas se prennent ensemble, c'est à dire à 7 lorsque nous sommes au complet. Voici comment cela se passe :"
      />

      <SubNav items={SUBNAV} />

      {/* PROCESSUS */}
      <section className="section section-cream anchor" id="processus">
        <div className="wrap">
          <div className="section-head">
            <span className="scrib scrib-teal" style={{ fontSize: 30, transform: 'rotate(-1.5deg)', display: 'inline-block' }}>Pas à pas</span>
            <h2>Processus pour être accueilli</h2>
          </div>
          <div className="steps steps-stack">
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

      {/* VIE COMMUNE */}
      <section className="section anchor" id="vie-commune">
        <div className="wrap">
          <div className="section-head">
            <span className="scrib" style={{ fontSize: 30, transform: 'rotate(-1.5deg)', display: 'inline-block' }}>Quelques règles</span>
            <h2>La vie commune à l&rsquo;Hors du temps</h2>
          </div>
          <div className="dimanches-block">
            <div className="prose dimanches-prose">
              {(accueilPage?.vie_commune_texte ?? '').split(/\n\n+/).filter(Boolean).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            {vieCommuneImageUrl ? (
              <div className="flyer-img" style={{ position: 'relative', minHeight: 400 }}>
                <Image
                  src={vieCommuneImageUrl}
                  alt={vieCommuneImage?.alt ?? "Vie commune à l'Hors du Temps"}
                  fill
                  style={{ objectFit: 'contain' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ) : (
              <div className="flyer-ph">image à fournir</div>
            )}
          </div>
        </div>
      </section>

      {/* ACTIVITÉS */}
      <section className="section section-cream anchor" id="activites">
        <div className="wrap">
          <div className="section-head">
            <span className="scrib scrib-teal" style={{ fontSize: 30, transform: 'rotate(-1.5deg)', display: 'inline-block' }}>À deux pas</span>
            <h2>Activités possibles à St Marcellin</h2>
          </div>
          <div className="prose">
            {(accueilPage?.activites_texte ?? '').split(/\n\n+/).filter(Boolean).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
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
