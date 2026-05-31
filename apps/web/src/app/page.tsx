import Image from 'next/image';
import Link from 'next/link';
import { getArticles } from '@/lib/strapi';
import type { Article } from '@hors-du-temps/types';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

const STATIC_ARTICLES = [
  { id: -1, slug: 'fonds-de-dotation', titre: 'Aidez-nous à racheter la maison !', date: '2026-04-29', extrait: "En 2027, la propriété sera mise en vente. Le fonds de dotation « La maison Hors du Temps » est lancé — premier palier déjà franchi.", image_principale: null, a_la_une: true },
  { id: -2, slug: '#', titre: 'Lettre aux adhérents — Avril 2026', date: '2026-04-29', extrait: "L'aventure continue : une nouvelle équipe prend le relais. Rendez-vous à la prochaine assemblée générale.", image_principale: null, a_la_une: false },
  { id: -3, slug: '#', titre: "Retour sur l'AG et les Dimanches ensemble", date: '2025-07-16', extrait: "Un repas sous les arbres, un bal folk, des rires partagés — merci à vous tous !", image_principale: null, a_la_une: false },
] as unknown as Article[];

const PORTES = [
  { href: '/qui-sommes-nous', bg: '#e8e0d0', titre: 'Qui sommes-nous ?', desc: "Notre histoire depuis 2010, l'équipe actuelle, les Dimanches Ensemble et ce qu'on dit de nous.", cta: 'En savoir plus' },
  { href: '/etre-accueilli', bg: '#f4dccb', titre: 'Je souhaite être accueilli', desc: "Vous traversez une période difficile ? Découvrez les modalités de l'accueil, pas à pas.", cta: 'Préparer ma venue' },
  { href: '/benevolat', bg: '#dfe7d2', titre: "J'aimerais être bénévole", desc: "Rejoignez l'équipe d'accueil, le jardin ou les Dimanches ensemble — il y a une place pour vous.", cta: 'Voir les missions' },
  { href: '/#don', bg: '#f0d9a8', titre: 'Je fais un don', desc: "Soutenez le fonctionnement quotidien — ou le rachat de la maison via le fonds de dotation.", cta: "Soutenir l'association" },
];

export default async function HomePage() {
  let articles: Article[] = STATIC_ARTICLES;
  try {
    const fetched = await getArticles();
    if (fetched.length > 0) articles = fetched.slice(0, 3);
  } catch {
    // Strapi indisponible — affiche statiques
  }

  const strapiBase = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

  return (
    <>
      {/* HERO */}
      <section className="home-hero">
        <div className="wrap home-hero-grid">
          <div>
            <span className="scrib scrib-teal" style={{ fontSize: 36, transform: 'rotate(-2deg)', display: 'inline-block', marginBottom: 6 }}>
              Bienvenue à L&rsquo;Hors du Temps
            </span>
            <h1>
              Un endroit où <span className="home-hero-hl">se poser</span>
              <br />quand on n&rsquo;en peut plus.
            </h1>
            <p className="home-hero-lead">
              Depuis 2010, notre maison à Saint-Marcellin accueille pour quelques jours
              celles et ceux qui ont besoin de faire une halte, de souffler,
              de retrouver confiance — en lien avec d&rsquo;autres et avec la nature.
            </p>
            <div className="home-hero-actions">
              <Link href="/etre-accueilli" className="btn btn-primary">Je souhaite être accueilli</Link>
              <Link href="/qui-sommes-nous" className="btn btn-ghost">Découvrir l&rsquo;association</Link>
            </div>
          </div>
          <div className="medallion-wrap">
            <div className="medallion" />
            <div className="medallion-note">
              <span className="tape" />
              La maison, un soir d&rsquo;automne — Saint-Marcellin, Isère.
            </div>
          </div>
        </div>
      </section>

      {/* CITATION + CHIFFRES */}
      <section className="home-quote">
        <div className="wrap home-quote-grid">
          <div className="qmark">&ldquo;</div>
          <div>
            <div className="qrow">
              <blockquote>
                De plus en plus de personnes sont fragilisées dans leur chemin de vie
                et n&rsquo;ont pas d&rsquo;endroit où se poser. Nous leur ouvrons un lieu paisible,
                pour un temps de vie partagé.
              </blockquote>
              <div className="qmark qmark-close">&rdquo;</div>
            </div>
            <cite>— L&rsquo;équipe de L&rsquo;Hors du Temps</cite>
            <div className="stats" style={{ marginTop: 44 }}>
              <div className="stat"><strong className="lnum">2010</strong><span>année de fondation</span></div>
              <div className="stat"><strong>Une maison</strong><span>à Saint-Marcellin (38)</span></div>
              <div className="stat"><strong className="lnum">+ de 30</strong><span>bénévoles engagés</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ACTUALITÉS */}
      <section className="home-actus">
        <div className="wrap">
          <div className="actus-head">
            <div>
              <span className="scrib" style={{ fontSize: 30, transform: 'rotate(-2deg)', display: 'inline-block' }}>Côté nouvelles</span>
              <h2>Les actualités</h2>
            </div>
            <Link href="/actualites" className="actus-all">Toutes les actualités →</Link>
          </div>
          <div className="actus-grid">
            {articles.map((article, i) => {
              const img = article.image_principale;
              const imgUrl = img ? (img.url.startsWith('http') ? img.url : `${strapiBase}${img.url}`) : null;
              return (
                <article key={article.id} className={`card ${i === 0 ? 'card-lead' : ''}`}>
                  {i === 0 && <span className="tape" />}
                  {imgUrl ? (
                    <div className="card-img" style={{ position: 'relative' }}>
                      <Image src={imgUrl} alt={img?.alternativeText ?? article.titre} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                  ) : (
                    <div className={i === 0 ? 'card-img-ph' : 'card-img-ph-teal'}>visuel à fournir</div>
                  )}
                  <div className="card-body">
                    <div className="card-date">{formatDate(article.date)}</div>
                    <h3>{article.titre}</h3>
                    <p>{article.extrait}</p>
                    <Link className="card-read" href={article.slug.startsWith('/') ? article.slug : `/actualites/${article.slug}`}>
                      Lire la suite
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* PORTES D'ENTRÉE */}
      <section className="home-portes">
        <div className="wrap">
          <div className="portes-head">
            <span className="scrib scrib-teal" style={{ fontSize: 30, transform: 'rotate(-1deg)', display: 'inline-block' }}>Par où commencer ?</span>
            <h2>Choisissez votre porte d&rsquo;entrée</h2>
          </div>
          <div className="portes-grid">
            {PORTES.map((p) => (
              <Link key={p.href} href={p.href} className="porte" style={{ ['--bg' as string]: p.bg }}>
                <div className="porte-icon">
                  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={60} height={60}>
                    <circle cx="32" cy="32" r="20" />
                  </svg>
                </div>
                <h3>{p.titre}</h3>
                <p>{p.desc}</p>
                <span className="porte-go">{p.cta}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* DON */}
      <section className="don-section anchor" id="don">
        <div className="wrap">
          <div className="don-head">
            <span className="scrib" style={{ fontSize: 36, transform: 'rotate(-2deg)', color: '#ffd9b4', display: 'inline-block' }}>Vous pouvez nous aider</span>
            <h2>Faire un don</h2>
            <p>Deux façons de soutenir l&rsquo;Hors du Temps : faire vivre l&rsquo;accueil au quotidien, ou nous aider à racheter la maison.</p>
          </div>
          <div className="don-grid">
            <div className="don-card">
              <span className="don-eyebrow">Au quotidien</span>
              <h3>Pour le fonctionnement de l&rsquo;association</h3>
              <p>Nourrir, chauffer, entretenir la maison et accompagner les personnes accueillies. Votre don nous aide à faire vivre l&rsquo;accueil jour après jour.</p>
              <a className="btn btn-dark" href="https://www.helloasso.com/associations/l-hors-du-temps/formulaires/2" target="_blank" rel="noopener noreferrer">Donner via HelloAsso →</a>
            </div>
            <div className="don-card don-card-dotation">
              <span className="don-badge">Urgence 2027</span>
              <span className="don-eyebrow">Un projet pour l&rsquo;avenir</span>
              <h3>Pour le rachat de la maison</h3>
              <p>En 2027, la maison sera mise en vente. Le fonds de dotation « La maison Hors du Temps » nous permet d&rsquo;agir. Aidez-nous à la racheter.</p>
              <Link href="/fonds-de-dotation" className="btn btn-primary">Soutenir le fonds de dotation →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
