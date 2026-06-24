import type { Metadata } from 'next';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import SubNav from '@/components/SubNav';
import { getDimanches, getFriseHistorique, getHistorique, getMembresEquipe } from '@/lib/strapi';
import type { FriseHistorique, MembreEquipe } from '@hors-du-temps/types';

export const metadata: Metadata = {
  title: "Qui sommes-nous ? — L'Hors du Temps",
  description:
    "L'histoire de L'Hors du Temps depuis 2010, l'équipe actuelle, les Dimanches Ensemble, ce qu'on dit de nous et nos rapports d'activité.",
};

const SUBNAV = [
  { id: 'historique', label: 'Historique' },
  { id: 'equipe', label: "L'équipe actuelle" },
  { id: 'dimanches', label: 'Dimanches Ensemble' },
  { id: 'presse', label: 'On parle de nous…' },
  { id: 'rapports', label: "Rapports d'activité" },
];

// Ne pas ajouter d'entrées fictives ici — la section est masquée si tous les href sont '#'
const PRESSE_LINKS: { year: string; title: string; source: string; href: string }[] = [];

// Ne pas ajouter d'entrées fictives ici — la section est masquée si tous les href sont '#'
const RAPPORTS: { year: string; title: string; note: string; href: string }[] = [];

const STRAPIBASE = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

// Fallback affiché si Strapi est inatteignable (mode démo Vercel ou panne) : reprend le texte de seed du CMS (apps/cms/src/index.ts).
const FALLBACK_RECIT = `L'Hors du temps a été créé sur une idée de Carole, qui a connu bien des galères, la précarité et a souhaité, avec son mari Bernard, trouver un lieu d'accueil pour que des personnes en difficulté de toutes sortes puissent se poser et qu'on "leur fiche la paix !", sans qu'on leur demande de s'inscrire dans un programme quelconque.

Séduit par ce projet, un propriétaire a proposé de louer sa grande maison pour un bail de très longue durée, située sur les côteaux de Saint-Marcellin, petite ville en Isère. La maison se situe à mi-chemin entre Grenoble et Valence dans la vallée du Sud-Grésivaudan, au pied des montagnes du Vercors.

Durant des années, Carole et Bernard ont accueilli de nombreuses personnes qui ont passé un temps plus ou moins long avec eux avant de reprendre leur route, de retrouver leur chemin...

Au décès de Carole, un autre couple est venu s'installer dans la maison de l'Hors du temps pour poursuivre ce généreux projet. Christine et Jean-Luc ont accueilli un grand nombre de personnes avec l'aide de salariés et de bénévoles pendant près de 5 ans. Ce sont maintenant Régine et Christian qui ont repris le flambeau courant 2026.`;

const FALLBACK_FRISE: FriseHistorique[] = [
  { id: -1, documentId: 'fallback-1', annee: '2010', evenement: 'Fondation par Carole et Bernard', ordre: 1, publishedAt: null },
  { id: -2, documentId: 'fallback-2', annee: '2015', evenement: 'Équipe de bénévoles réguliers constituée', ordre: 2, publishedAt: null },
  { id: -3, documentId: 'fallback-3', annee: '2019', evenement: 'Lancement des Dimanches Ensemble', ordre: 3, publishedAt: null },
  { id: -4, documentId: 'fallback-4', annee: '2024', evenement: 'Nouveau rythme : un dimanche sur trois', ordre: 4, publishedAt: null },
  { id: -5, documentId: 'fallback-5', annee: '2026', evenement: 'Création du fonds de dotation & nouvelle équipe accueillante', ordre: 5, publishedAt: null },
  { id: -6, documentId: 'fallback-6', annee: '2027', evenement: 'Objectif : rachat de la maison', ordre: 6, publishedAt: null },
];

const FALLBACK_MEMBRES: MembreEquipe[] = [
  {
    id: -1,
    documentId: 'fallback-1',
    prenom: 'Marie',
    role: 'Accueillante principale',
    presentation: "C'est une rencontre lors d'un dimanche ensemble qui l'a amenée à rejoindre l'association. Elle coordonne les séjours et veille à ce que chacun trouve sa place à la maison.",
    photo: null,
    ordre: 1,
    publishedAt: null,
  },
  {
    id: -2,
    documentId: 'fallback-2',
    prenom: 'Jean-Pierre',
    role: 'Jardinier bénévole',
    presentation: 'Retraité passionné de jardinage, il entretient le potager et les espaces verts. Le jardin est pour lui un lieu de transmission et de partage silencieux.',
    photo: null,
    ordre: 2,
    publishedAt: null,
  },
  {
    id: -3,
    documentId: 'fallback-3',
    prenom: 'Sylvie',
    role: 'Bénévole cuisine et animation',
    presentation: 'Cuisinière du cœur, elle prépare les repas partagés et anime les Dimanches Ensemble avec une énergie contagieuse.',
    photo: null,
    ordre: 3,
    publishedAt: null,
  },
];

export default async function QuiSommesNousPage() {
  let membres: MembreEquipe[] = FALLBACK_MEMBRES;
  let recitParagraphes: string[] = FALLBACK_RECIT.split(/\n\n+/).filter(Boolean);
  let frise: FriseHistorique[] = FALLBACK_FRISE;
  let flyerUrl: string | null = null;
  let flyerAlt: string | null = null;

  try {
    const [fetchedMembres, fetchedHistorique, fetchedFrise, fetchedDimanche] = await Promise.allSettled([
      getMembresEquipe(),
      getHistorique(),
      getFriseHistorique(),
      getDimanches(),
    ]);
    if (fetchedMembres.status === 'fulfilled') membres = fetchedMembres.value;
    if (fetchedHistorique.status === 'fulfilled') {
      recitParagraphes = fetchedHistorique.value?.recit ? fetchedHistorique.value.recit.split(/\n\n+/).filter(Boolean) : [];
    }
    if (fetchedFrise.status === 'fulfilled') frise = fetchedFrise.value;
    if (fetchedDimanche.status === 'fulfilled' && fetchedDimanche.value?.flyer) {
      const flyer = fetchedDimanche.value.flyer;
      flyerUrl = flyer.url.startsWith('http') ? flyer.url : `${STRAPIBASE}${flyer.url}`;
      flyerAlt = flyer.alternativeText ?? 'Flyer Dimanches Ensemble';
    }
  } catch { /* Strapi indisponible */ }

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Qui sommes-nous ?', url: 'https://assohorsdutemps.fr/qui-sommes-nous' }]} />
      <PageHero
        scrib="Faisons connaissance"
        title="Qui sommes-nous ?"
        lead="Une petite association née en 2010 autour d'une conviction simple : chacun mérite un endroit où se poser. Voici notre histoire, l'équipe et la vie de la maison."
      />

      <SubNav items={SUBNAV} />

      {/* HISTORIQUE */}
      {(recitParagraphes.length > 0 || frise.length > 0) && (
        <section className="section anchor" id="historique">
          <div className="wrap">
            <div className="section-head">
              <span className="scrib" style={{ fontSize: 30, transform: 'rotate(-1.5deg)', display: 'inline-block' }}>Depuis 2010</span>
              <h2>Notre historique</h2>
            </div>
            <div className="historique-grid">
              <div className="prose historique-recit">
                {recitParagraphes.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <div className="historique-frise">
                {frise.map((item) => (
                  <div key={item.id} className="frise-item">
                    <span className="frise-annee lnum">{item.annee}</span>
                    <span className="frise-evenement">{item.evenement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ÉQUIPE */}
      {membres.length > 0 && (
        <section className="section section-cream anchor" id="equipe">
          <div className="wrap">
            <div className="section-head">
              <span className="scrib" style={{ fontSize: 30, transform: 'rotate(-1.5deg)', display: 'inline-block' }}>Les visages de la maison</span>
              <h2>L&rsquo;équipe actuelle</h2>
            </div>
            <div className="team-grid">
              {membres.map((m) => {
                const photo = m.photo;
                const photoUrl = photo ? (photo.url.startsWith('http') ? photo.url : `${STRAPIBASE}${photo.url}`) : null;
                return (
                  <article key={m.id} className="member">
                    <div className="member-photo">
                      {photoUrl ? (
                        <Image src={photoUrl} alt={photo?.alternativeText ?? m.prenom} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 50vw, 33vw" />
                      ) : (
                        'photo (avec accord) · 4:5'
                      )}
                    </div>
                    <div className="member-body">
                      <h3>{m.prenom}</h3>
                      <div className="member-role">{m.role}</div>
                      <p>{m.presentation}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* DIMANCHES ENSEMBLE */}
      <section className="section anchor" id="dimanches">
        <div className="wrap">
          <div className="section-head">
            <span className="scrib scrib-teal" style={{ fontSize: 30, transform: 'rotate(-1.5deg)', display: 'inline-block' }}>Un dimanche sur trois</span>
            <h2>Dimanches Ensemble</h2>
          </div>
          <div className="dimanches-block">
            <div className="prose dimanches-prose">
              <p>Depuis l&rsquo;été 2024, les Dimanches Ensemble permettent aux personnes qui le souhaitent de partager un moment convivial à l&rsquo;Hors du Temps un dimanche sur trois. Au programme, repas et jeux pour 10 personnes de St Marcellin ou des alentours. Vous pouvez aussi devenir bénévole d&rsquo;accueil spécifiquement pour les Dimanches Ensemble, contactez-nous si cela vous intéresse&nbsp;!</p>
              <p>Toutes les informations importantes (prochaines dates, participation, contact, etc) se trouvent sur le flyer ci-dessous&nbsp;:</p>
            </div>
            {flyerUrl ? (
              <div className="flyer-img" style={{ position: 'relative', minHeight: 400 }}>
                <Image
                  src={flyerUrl}
                  alt={flyerAlt ?? 'Flyer Dimanches Ensemble'}
                  fill
                  style={{ objectFit: 'contain' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ) : (
              <div className="flyer-ph">dernier flyer<br />Dimanches Ensemble<br />(image à fournir)</div>
            )}
          </div>
        </div>
      </section>

      {/* ON PARLE DE NOUS — masqué tant que vide */}
      {PRESSE_LINKS.length > 0 && (
        <section className="section section-cream anchor" id="presse">
          <div className="wrap">
            <div className="section-head">
              <span className="scrib" style={{ fontSize: 30, transform: 'rotate(-1.5deg)', display: 'inline-block' }}>Dans les médias</span>
              <h2>On parle de nous…</h2>
              <p className="intro">Articles, interviews et reportages consacrés à l&rsquo;association et à la maison.</p>
            </div>
            <div className="link-list">
              {PRESSE_LINKS.map((item, i) => (
                <a key={i} className="link-row" href={item.href} target="_blank" rel="noopener noreferrer">
                  <span className="link-meta">{item.year}</span>
                  <span className="link-title">
                    {item.title}
                    <small>{item.source}</small>
                  </span>
                  <span className="link-arrow">↗</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RAPPORTS D'ACTIVITÉ — masqué tant que vide */}
      {RAPPORTS.length > 0 && (
        <section className="section anchor" id="rapports">
          <div className="wrap">
            <div className="section-head">
              <span className="scrib scrib-teal" style={{ fontSize: 30, transform: 'rotate(-1.5deg)', display: 'inline-block' }}>En toute transparence</span>
              <h2>Rapports d&rsquo;activité</h2>
              <p className="intro">Vous pouvez consulter ici nos lettres aux adhérents et bilans des précédentes AG.</p>
            </div>
            <div className="link-list">
              {RAPPORTS.map((r) => (
                <a key={r.year} className="link-row" href={r.href}>
                  <span className="link-meta">{r.year}</span>
                  <span className="link-title">
                    {r.title}
                    <small>{r.note}</small>
                  </span>
                  <span className="link-arrow">↓</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

    </>
  );
}
