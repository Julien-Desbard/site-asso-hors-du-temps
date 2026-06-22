import type { Metadata } from 'next';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import Image from 'next/image';
import Link from 'next/link';
import Callout from '@/components/Callout';
import PageHero from '@/components/PageHero';
import SubNav from '@/components/SubNav';
import { getAccueilPage, getEtapesAccueil } from '@/lib/strapi';
import type { AccueilPage, EtapeAccueil } from '@hors-du-temps/types';

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

const STRAPIBASE = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

// Fallback affiché tant que Strapi prod n'est pas branché (mode démo Vercel) : vie_commune_texte et activites_texte viennent uniquement de Strapi, donc vides sans ce texte en dur.
const FALLBACK_VIE_COMMUNE = "Les repas de midi et du soir se prennent ensemble. Le petit déjeuner est en libre-service. Une participation à la réalisation des repas, à la vaisselle ou au nettoyage est demandée. Chaque personne accueillie est invitée à participer selon ses aptitudes et possibilités, à la vie de la maison, environ 2h par jour.\n\nFrais de séjour : un forfait de 10 euros/jour est payable par quinzaine. Vous aurez une chambre individuelle avec cabinet de toilette (WC et douche). Il appartient au résident d'en faire le ménage. Il est possible de participer à de petits travaux d'entretien de la maison ou du jardin si vous le souhaitez, à voir avec les responsables de maison.\n\nEn fonction de votre situation, les démarches administratives, de santé… peuvent se poursuivre pendant votre séjour. L'équipe d'accueil de l'Hors du temps fait en sorte de vous soutenir (sans se substituer aux professionnels déjà engagés auprès de vous). Nous sommes à l'écoute des personnes, de leur bien-être mais nous les laissons avancer à leur rythme, sans poser de questions. Les personnes accueillies font les démarches qu'elles jugent nécessaires en dehors de la maison. Les services sociaux ou médicaux de St Marcellin peuvent prendre le relais si nécessaire.";
const FALLBACK_ACTIVITES = "Texte à venir.";

const FALLBACK_ETAPES_ACCUEIL: EtapeAccueil[] = [
  {
    id: -1,
    documentId: 'fallback-1',
    titre: 'Prendre contact',
    tag: 'on vous écoute',
    description:
      "Appelez-nous sur les heures de bureau au 07 48 10 19 94 afin de nous expliquer votre situation et votre besoin (évitez les heures de repas SVP). Après réflexion en équipe, nous vous recontacterons pour convenir d'un rendez-vous en présentiel, à St Marcellin, si votre demande semble cohérente avec le projet de l'association.",
    ordre: 1,
    publishedAt: null,
  },
  {
    id: -2,
    documentId: 'fallback-2',
    titre: 'Faire connaissance',
    tag: 'sans jugement',
    description:
      "Le rendez-vous dure 1h environ sur place. Nous vous présenterons le fonctionnement de la maison, et vous nous expliquerez plus en détail ce qui vous pousse à demander un séjour de répit à l'Hors du Temps. Après cela, vous pourrez nous rappeler 2 jours plus tard pour confirmer ou infirmer votre demande de séjour. Ces 48 heures nous permettront à nous aussi de statuer sur votre demande.",
    ordre: 2,
    publishedAt: null,
  },
  {
    id: -3,
    documentId: 'fallback-3',
    titre: 'Préparer le séjour',
    tag: 'à votre rythme',
    description:
      "On fixe ensemble les dates et durée du séjour suivant nos contraintes respectives. On part toujours sur une période courte, qui se prolonge au fur et à mesure, même pour les séjours longs.",
    ordre: 3,
    publishedAt: null,
  },
  {
    id: -4,
    documentId: 'fallback-4',
    titre: 'Le séjour à la maison',
    tag: 'bienvenue',
    description:
      "On vous accueille le jour J pour un répit ressourçant. Voir ci-dessous les règles de vie commune qui sont les nôtres.",
    ordre: 4,
    publishedAt: null,
  },
];

export default async function EtreAccueilliPage() {
  let steps: EtapeAccueil[] = FALLBACK_ETAPES_ACCUEIL;
  let accueilPage: AccueilPage | null = null;

  try {
    const [fetchedSteps, fetchedAccueilPage] = await Promise.allSettled([
      getEtapesAccueil(),
      getAccueilPage(),
    ]);
    if (fetchedSteps.status === 'fulfilled') steps = fetchedSteps.value;
    if (fetchedAccueilPage.status === 'fulfilled') accueilPage = fetchedAccueilPage.value;
  } catch { /* Strapi indisponible */ }

  const vieCommuneImage = accueilPage?.vie_commune_image;
  const vieCommuneImageUrl = vieCommuneImage
    ? (vieCommuneImage.url.startsWith('http') ? vieCommuneImage.url : `${STRAPIBASE}${vieCommuneImage.url}`)
    : null;

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Être accueilli', url: 'https://assohorsdutemps.fr/etre-accueilli' }]} />
      <PageHero
        scrib="Vous avez besoin de souffler"
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
            <p className="intro">Du premier contact au retour chez soi, chaque étape se fait en douceur, à votre rythme.</p>
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
              {(accueilPage?.vie_commune_texte ?? FALLBACK_VIE_COMMUNE).split(/\n\n+/).filter(Boolean).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            {vieCommuneImageUrl ? (
              <div className="flyer-img" style={{ position: 'relative', minHeight: 400 }}>
                <Image
                  src={vieCommuneImageUrl}
                  alt={vieCommuneImage?.alternativeText ?? "Vie commune à l'Hors du Temps"}
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
            {(accueilPage?.activites_texte ?? FALLBACK_ACTIVITES).split(/\n\n+/).filter(Boolean).map((para, i) => (
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
