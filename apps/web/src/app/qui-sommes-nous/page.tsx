import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Callout from '@/components/Callout';
import PageHero from '@/components/PageHero';
import SubNav from '@/components/SubNav';
import { getMembresEquipe } from '@/lib/strapi';
import type { MembreEquipe } from '@hors-du-temps/types';

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

const TIMELINE = [
  {
    year: '2010',
    title: "La naissance d'une intuition",
    text: "L'idée d'un lieu de répit, à l'écart du temps qui presse, prend forme. La maison de Saint-Marcellin ouvre ses portes pour accueillir celles et ceux qui ont besoin de souffler.",
  },
  {
    year: '2015',
    title: 'Une équipe de bénévoles fidèles',
    text: "Au fil des séjours, un noyau de bénévoles se constitue autour de l'accueil, du jardin et des repas partagés. La maison devient un vrai lieu de vie.",
  },
  {
    year: '2019',
    title: 'Les « Dimanches Ensemble »',
    text: "Lancement des rendez-vous ouverts à toutes et tous : un dimanche par mois pour se retrouver, partager un repas, jouer de la musique et tisser des liens.",
  },
  {
    year: '2026',
    title: 'Création du fonds de dotation',
    text: "Face à la mise en vente annoncée de la propriété, l'association crée en février 2026 le fonds de dotation « La maison Hors du Temps » pour permettre son rachat.",
  },
  {
    year: '2027',
    title: 'Le rachat de la maison',
    text: "L'objectif : que la maison reste pour longtemps un lieu de répit. Une mobilisation en cours, à laquelle chacun peut prendre part.",
  },
];

const PRESSE_LINKS = [
  { year: '2026', title: "Titre de l'article ou de l'interview", source: 'Nom du média — quelques mots de contexte', href: '#' },
  { year: '2025', title: "Titre de l'article ou de l'interview", source: 'Nom du média — quelques mots de contexte', href: '#' },
  { year: '2024', title: "Titre de l'article ou de l'interview", source: 'Nom du média — quelques mots de contexte', href: '#' },
];

const RAPPORTS = [
  { year: '2025', title: "Rapport d'activité 2025", note: 'PDF — à déposer', href: '#' },
  { year: '2024', title: "Rapport d'activité 2024", note: 'PDF — à déposer', href: '#' },
  { year: '2023', title: "Rapport d'activité 2023", note: 'PDF — à déposer', href: '#' },
];

const STRAPIBASE = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

const PLACEHOLDER_MEMBRES: MembreEquipe[] = [1, 2, 3].map((n) => ({
  id: -n, documentId: String(n), prenom: 'Prénom', role: "Son rôle dans l'équipe",
  presentation: "Un petit texte de présentation : ce qui l'a amené·e à l'association, ce qu'il/elle y fait.",
  photo: null, ordre: n, publishedAt: null,
}));

export default async function QuiSommesNousPage() {
  let membres: MembreEquipe[] = PLACEHOLDER_MEMBRES;
  try {
    const fetched = await getMembresEquipe();
    if (fetched.length > 0) membres = fetched;
  } catch { /* Strapi indisponible */ }

  return (
    <>
      <PageHero
        scrib="Faisons connaissance"
        title="Qui sommes-nous ?"
        lead="Une petite association née en 2010 autour d'une conviction simple : chacun mérite un endroit où se poser. Voici notre histoire, l'équipe et la vie de la maison."
      />

      <SubNav items={SUBNAV} />

      {/* HISTORIQUE */}
      <section className="section anchor" id="historique">
        <div className="wrap">
          <div className="section-head">
            <span className="scrib" style={{ fontSize: 30, transform: 'rotate(-1.5deg)', display: 'inline-block' }}>Depuis 2010</span>
            <h2>Notre historique</h2>
            <p className="intro">De la première intuition à la création du fonds de dotation, retour sur les grandes étapes de l&rsquo;aventure.</p>
          </div>
          <div className="timeline">
            {TIMELINE.map((item) => (
              <div key={item.year} className="tl-item">
                <span className="tl-dot">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" width={15} height={15}>
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                </span>
                <div className="tl-year lnum">{item.year}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ÉQUIPE */}
      <section className="section section-cream anchor" id="equipe">
        <div className="wrap">
          <div className="section-head">
            <span className="scrib" style={{ fontSize: 30, transform: 'rotate(-1.5deg)', display: 'inline-block' }}>Les visages de la maison</span>
            <h2>L&rsquo;équipe actuelle</h2>
            <p className="intro">Bénévoles, accueillants, jardiniers, musiciens du dimanche… Voici celles et ceux qui font vivre l&rsquo;Hors du Temps au quotidien.</p>
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

      {/* DIMANCHES ENSEMBLE */}
      <section className="section anchor" id="dimanches">
        <div className="wrap">
          <div className="section-head">
            <span className="scrib scrib-teal" style={{ fontSize: 30, transform: 'rotate(-1.5deg)', display: 'inline-block' }}>Un dimanche par mois</span>
            <h2>Dimanches Ensemble</h2>
          </div>
          <div className="flyer-block">
            <div className="prose">
              <p>Les <strong>Dimanches Ensemble</strong>, ce sont des rendez-vous ouverts à toutes et tous : personnes accueillies, bénévoles, voisins, curieux de passage. On partage un repas, on prend le temps, on joue de la musique, on rit, on souffle — ensemble.</p>
              <p>Pas besoin de s&rsquo;inscrire ni de prévoir quoi que ce soit : venez comme vous êtes. C&rsquo;est souvent la plus belle porte d&rsquo;entrée pour découvrir l&rsquo;esprit de la maison.</p>
              <p>Retrouvez les <strong>prochaines dates</strong> sur le dernier flyer ci-contre.</p>
              <Link className="btn btn-teal" href="/actualites" style={{ marginTop: 16, display: 'inline-block' }}>Voir les prochaines dates →</Link>
            </div>
            <div className="flyer-ph">dernier flyer<br />Dimanches Ensemble<br />(image à fournir)</div>
          </div>
        </div>
      </section>

      {/* ON PARLE DE NOUS */}
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

      {/* RAPPORTS D'ACTIVITÉ */}
      <section className="section anchor" id="rapports">
        <div className="wrap">
          <div className="section-head">
            <span className="scrib scrib-teal" style={{ fontSize: 30, transform: 'rotate(-1.5deg)', display: 'inline-block' }}>En toute transparence</span>
            <h2>Rapports d&rsquo;activité</h2>
            <p className="intro">Chaque année, nous rendons compte de la vie de l&rsquo;association : accueils, événements, bilan moral et financier.</p>
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

      <Callout
        title="Envie de nous rejoindre ?"
        text="Que ce soit pour donner un coup de main, être accueilli ou simplement venir un dimanche — la maison vous est ouverte."
        ctaLabel="Devenir bénévole"
        ctaHref="/benevolat"
      />
    </>
  );
}
