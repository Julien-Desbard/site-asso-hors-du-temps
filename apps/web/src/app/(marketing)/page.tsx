import Image from 'next/image';
import Link from 'next/link';
import { getArticles, getParametres } from '@/lib/payload';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

const PORTES = [
  { href: '/qui-sommes-nous', bg: '#e8e0d0', titre: 'Qui sommes-nous ?', desc: "Notre histoire depuis 2010, l'équipe actuelle, les Dimanches Ensemble et ce qu'on dit de nous.", cta: 'En savoir plus' },
  { href: '/etre-accueilli', bg: '#f4dccb', titre: 'Je souhaite être accueilli', desc: "Vous traversez une période difficile ? Découvrez les modalités de l'accueil, pas à pas.", cta: 'Préparer ma venue' },
  { href: '/benevolat', bg: '#dfe7d2', titre: "J'aimerais être bénévole", desc: "Rejoignez l'équipe d'accueil, le Fonds de dotation ou les Dimanches Ensemble — il y a une place pour vous.", cta: 'Voir les missions' },
  { href: '/#don', bg: '#f0d9a8', titre: 'Je fais un don', desc: "Soutenez le fonctionnement quotidien — ou le rachat de la maison via le fonds de dotation.", cta: "Soutenir l'association" },
];

export default async function HomePage() {
  const [allArticles, parametres] = await Promise.all([getArticles(), getParametres()]);
  const articles = allArticles.slice(0, 3);
  const donFonctionnementUrl = parametres?.don_fonctionnement_url ?? 'https://www.helloasso.com/associations/l-hors-du-temps/formulaires/2';

  return (
    <>
      {/* HERO */}
      <section className="home-hero">
        <div className="wrap home-hero-grid">
          <div>
            <span className="scrib scrib-teal" style={{ fontSize: 36, transform: 'rotate(-2deg)', display: 'inline-block', marginBottom: 6 }}>
              Bienvenue à L&rsquo;Hors du Temps
            </span>
            <p className="home-hero-tagline">
              Un lieu paisible où <span className="home-hero-hl">se poser</span>
              <br />pour les personnes
              <br />qui n&rsquo;en peuvent plus.
            </p>
            <p className="home-hero-lead">
              Depuis 2010, notre association accueille des personnes ayant un parcours de vie difficile
              à St Marcellin en Isère. Cet accueil permet à chacun de faire une halte, de se reposer,
              de reprendre confiance en soi et de se ressourcer en lien avec les autres et la nature.
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
      {articles.length > 0 && (
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
                const img = typeof article.image_principale === 'object' ? article.image_principale : null;
                const imgUrl = img?.url ?? null;
                return (
                  <article key={article.id} className={`card ${i === 0 ? 'card-lead' : ''}`}>
                    {i === 0 && <span className="tape" />}
                    {imgUrl ? (
                      <div className="card-img" style={{ position: 'relative' }}>
                        <Image src={imgUrl} alt={img?.alt ?? article.titre} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
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
            <div className="actus-cta">
              <Link href="/actualites" className="btn btn-primary">Voir toutes les actualités →</Link>
            </div>
          </div>
        </section>
      )}

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
              <p>Pour accompagner les personnes accueillies mais aussi pour les repas, le chauffage ou encore l&rsquo;entretien de la maison. Votre don nous aide à faire vivre l&rsquo;accueil jour après jour.</p>
              <a className="btn btn-dark" href={donFonctionnementUrl} target="_blank" rel="noopener noreferrer">Donner via HelloAsso →</a>
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
