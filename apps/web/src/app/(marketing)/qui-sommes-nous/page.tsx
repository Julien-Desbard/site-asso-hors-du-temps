import type { Metadata } from 'next';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import SubNav from '@/components/SubNav';
import { getArticlesPresse, getDimanches, getFriseHistorique, getHistorique, getMembresEquipe, getRapportsActivite } from '@/lib/payload';

export const metadata: Metadata = {
  title: "Qui sommes-nous ? — L'Hors du Temps",
  description:
    "L'histoire de L'Hors du Temps depuis 2010, l'équipe actuelle, les Dimanches Ensemble, ce qu'on dit de nous et nos rapports d'activité.",
};

export default async function QuiSommesNousPage() {
  const [membres, historique, frise, dimanche, articlesPresse, rapports] = await Promise.all([
    getMembresEquipe(),
    getHistorique(),
    getFriseHistorique(),
    getDimanches(),
    getArticlesPresse(),
    getRapportsActivite(),
  ]);

  const recitParagraphes = historique?.recit ? historique.recit.split(/\n\n+/).filter(Boolean) : [];

  const flyer = typeof dimanche?.flyer === 'object' ? dimanche.flyer : null;
  const flyerUrl = flyer?.url ?? null;
  const flyerAlt = flyer?.alt ?? 'Flyer Dimanches Ensemble';

  const subnav = [
    (recitParagraphes.length > 0 || frise.length > 0) && { id: 'historique', label: 'Historique' },
    membres.length > 0 && { id: 'equipe', label: "L'équipe actuelle" },
    { id: 'dimanches', label: 'Dimanches Ensemble' },
    articlesPresse.length > 0 && { id: 'presse', label: 'On parle de nous…' },
    { id: 'rapports', label: "Rapports d'activité" },
  ].filter(Boolean) as { id: string; label: string }[];

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Qui sommes-nous ?', url: 'https://assohorsdutemps.fr/qui-sommes-nous' }]} />
      <PageHero
        scrib="Faisons connaissance"
        title="Qui sommes-nous ?"
        lead="Une petite association née en 2010 autour d'une conviction simple : chacun mérite un endroit où se poser. Voici notre histoire, l'équipe et la vie de la maison."
      />

      <SubNav items={subnav} />

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
                const photo = typeof m.photo === 'object' ? m.photo : null;
                const photoUrl = photo?.url ?? null;
                return (
                  <article key={m.id} className="member">
                    <div className="member-photo">
                      {photoUrl ? (
                        <Image src={photoUrl} alt={photo?.alt ?? m.prenom} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 50vw, 33vw" />
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
      {articlesPresse.length > 0 && (
        <section className="section section-cream anchor" id="presse">
          <div className="wrap">
            <div className="section-head">
              <span className="scrib" style={{ fontSize: 30, transform: 'rotate(-1.5deg)', display: 'inline-block' }}>Dans les médias</span>
              <h2>On parle de nous…</h2>
              <p className="intro">Articles, interviews et reportages consacrés à l&rsquo;association et à la maison.</p>
            </div>
            <div className="link-list">
              {articlesPresse.map((item) => (
                <a key={item.id} className="link-row" href={item.lien} target="_blank" rel="noopener noreferrer">
                  <span className="link-meta">{item.annee}</span>
                  <span className="link-title">
                    {item.titre}
                    <small>{item.source}</small>
                  </span>
                  <span className="link-arrow">↗</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RAPPORTS D'ACTIVITÉ */}
      <section className="section anchor" id="rapports">
        <div className="wrap">
          <div className="section-head">
            <span className="scrib scrib-teal" style={{ fontSize: 30, transform: 'rotate(-1.5deg)', display: 'inline-block' }}>En toute transparence</span>
            <h2>Rapports d&rsquo;activité</h2>
            <p className="intro">Vous pouvez consulter ici nos lettres aux adhérents et bilans des précédentes AG.</p>
          </div>
          {rapports.length > 0 && (
            <div className="link-list">
              {rapports.map((r) => {
                const fichier = typeof r.fichier === 'object' ? r.fichier : null;
                const fichierUrl = fichier?.url ?? null;
                const content = (
                  <>
                    <span className="link-meta">{r.annee}</span>
                    <span className="link-title">
                      {r.titre}
                      {r.note && <small>{r.note}</small>}
                    </span>
                    <span className="link-arrow">{fichierUrl ? '↓' : '…'}</span>
                  </>
                );
                return fichierUrl ? (
                  <a key={r.id} className="link-row" href={fichierUrl} target="_blank" rel="noopener noreferrer">
                    {content}
                  </a>
                ) : (
                  <div key={r.id} className="link-row" style={{ opacity: 0.6, cursor: 'default' }}>
                    {content}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

    </>
  );
}
