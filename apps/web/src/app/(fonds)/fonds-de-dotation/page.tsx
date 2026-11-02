import Image from 'next/image';
import { getFondsDotation } from '@/lib/payload';
import { enParagraphes, formaterEuros, remplissageThermometre, urlPhoto } from '@/lib/fonds';
import Logo from './Logo';
import Pictogramme from './Pictogramme';
import styles from './page.module.css';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://assohorsdutemps.fr';

// Page autonome du fonds de dotation, reprise du dépliant PDF 4 pages du client.
// Tout le contenu vient du global Payload « fonds-dotation » (modifiable par Christine).
export default async function FondsDeDotationPage() {
  const f = await getFondsDotation();

  const photoCouverture = urlPhoto(f.photo_couverture, f.photo_couverture_defaut);
  const photoFonds = urlPhoto(f.fonds_photo, f.fonds_photo_defaut);
  const remplissage = remplissageThermometre(f.collecte.recolte, f.collecte.objectif);
  const problematiques = f.problematiques ?? [];

  const donateSchema = {
    '@context': 'https://schema.org',
    '@type': 'DonateAction',
    recipient: { '@type': 'Organization', name: f.pied_nom ?? 'Fonds de dotation La maison Hors du Temps' },
    description:
      "Les dons au fonds de dotation « La maison Hors du Temps » financent le rachat de la maison de répit de Saint-Marcellin (Isère).",
    url: `${BASE}/fonds-de-dotation`,
    ...(f.don_url && {
      target: {
        '@type': 'EntryPoint',
        urlTemplate: f.don_url,
        actionPlatform: ['https://schema.org/DesktopWebPlatform', 'https://schema.org/MobileWebPlatform'],
      },
    }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(donateSchema) }} />

      <main>
        {/* PAGE 1 — COUVERTURE */}
        <section className={styles.couverture}>
          {photoCouverture && (
            <div className={styles.couverturePhoto}>
              <Image src={photoCouverture} alt="La maison Hors du Temps à Saint-Marcellin" fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
            </div>
          )}
          <div className={styles.couvertureTitre}>
            <Logo />
            <h1 className={styles.grandTitre}>{f.titre}</h1>
          </div>
        </section>

        <section className={styles.projet}>
          <div className={styles.conteneur}>
            <div className={styles.projetGrille}>
              <div>
                <h2 className={styles.etiquette}>Notre projet</h2>
                {f.projet_titre && <h3 className={styles.projetTitre}>{f.projet_titre}</h3>}
                <div className={styles.texte}>
                  {enParagraphes(f.projet_texte).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>

              <div className={styles.collecte}>
                {f.collecte.titre && <h2 className={`${styles.etiquette} ${styles.collecteEtiquette}`}>{f.collecte.titre}</h2>}
                <div
                  className={styles.thermometre}
                  role="img"
                  aria-label={`Collecte remplie à ${remplissage} %`}
                  style={{ '--remplissage': `${remplissage}%` } as React.CSSProperties}
                >
                  <span className={styles.thermometreTube}>
                    <span className={styles.thermometreNiveau} />
                  </span>
                  <span className={styles.thermometreBulbe} />
                </div>
                <div className={styles.collecteChiffres}>
                  <p className={styles.collecteLibelle}>Déjà récoltés</p>
                  <p className={styles.collecteMontant}>{formaterEuros(f.collecte.recolte)}</p>
                  {f.collecte.objectif_libelle && <p className={styles.collecteObjectifLibelle}>{f.collecte.objectif_libelle}</p>}
                  <p className={styles.collecteObjectif}>{formaterEuros(f.collecte.objectif)} de plus</p>
                  {f.collecte.echeance && <p className={styles.collecteEcheance}>{f.collecte.echeance}</p>}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PAGE 2 — LE FONDS */}
        <section className={styles.fonds}>
          <div className={styles.conteneur}>
            <div className={styles.fondsEnTete}>
              {f.fonds_titre && <h2 className={styles.titreFeutre}>{f.fonds_titre}</h2>}
              {f.fonds_sous_titre && <p className={styles.fondsSousTitre}>{f.fonds_sous_titre}</p>}
            </div>
            <div className={styles.fondsGrille}>
              {photoFonds && (
                <div className={styles.fondsPhoto}>
                  <Image src={photoFonds} alt="La maison à l’automne" fill sizes="(max-width: 800px) 100vw, 45vw" style={{ objectFit: 'cover' }} />
                </div>
              )}
              <div className={styles.texte}>
                {enParagraphes(f.fonds_texte).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            <div className={styles.atouts}>
              {(f.pastilles ?? []).length > 0 && (
                <ul className={styles.pastilles}>
                  {f.pastilles!.map((p, i) => (
                    <li key={p.id ?? i} className={styles.pastille}>
                      <strong>{p.titre}</strong>
                      {p.texte && <span>{p.texte}</span>}
                    </li>
                  ))}
                </ul>
              )}
              {(f.arguments ?? []).length > 0 && (
                <ul className={styles.arguments}>
                  {f.arguments!.map((a, i) => (
                    <li key={a.id ?? i}>{a.texte}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className={styles.participer}>
              {f.participer_titre && <h2 className={styles.titreFeutre}>{f.participer_titre}</h2>}
              <div className={styles.participerTexte}>
                <p>
                  {f.participer_intro}{' '}
                  {f.pied_email && (
                    <a className={styles.email} href={`mailto:${f.pied_email}`}>
                      {f.pied_email}
                    </a>
                  )}{' '}
                  {f.participer_details}
                </p>
                {f.don_url && (
                  <a className={styles.boutonDon} href={f.don_url} target="_blank" rel="noopener noreferrer">
                    {f.don_libelle || 'Faire un don en ligne'} →
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* PAGE 3 — L'ASSOCIATION */}
        <section className={styles.asso}>
          <div className={styles.conteneur}>
            <div className={styles.assoGrille}>
              <div className={styles.refuge}>
                {f.refuge_titre && <p className={styles.refugeTitre}>{f.refuge_titre}</p>}
                <ul className={styles.refugeVerbes}>
                  {(f.refuge_verbes ?? []).map((v, i) => (
                    <li key={v.id ?? i}>{v.texte}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.texte}>
                {enParagraphes(f.asso_texte).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {f.asso_lien_url && (
                  <p>
                    Pour en savoir plus&nbsp;:{' '}
                    <a className={styles.lienFort} href={f.asso_lien_url} target="_blank" rel="noopener noreferrer">
                      {f.asso_lien_libelle || f.asso_lien_url}
                    </a>
                  </p>
                )}
              </div>
            </div>

            {(f.chiffres ?? []).length > 0 && (
              <div className={styles.chiffres}>
                {f.chiffres_annee && <p className={styles.chiffresAnnee}>{f.chiffres_annee}</p>}
                <ul className={styles.chiffresListe}>
                  {f.chiffres!.map((c, i) => (
                    <li key={c.id ?? i}>
                      <Pictogramme icone={c.icone} />
                      <strong>{c.valeur}</strong>
                      <span>{c.libelle}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {problematiques.length > 0 && (
              <div className={styles.problematiques}>
                <ul className={styles.barres}>
                  {problematiques.map((p, i) => (
                    <li key={p.id ?? i} className={styles.barre}>
                      <span className={styles.barrePourcent}>{p.pourcentage} %</span>
                      <span className={styles.barrePiste}>
                        <span className={styles.barreValeur} style={{ height: `${Math.min(Math.max(p.pourcentage, 0), 100)}%` }} />
                      </span>
                      <span className={styles.barreLibelle}>{p.libelle}</span>
                    </li>
                  ))}
                </ul>
                <div className={styles.problematiquesLegende}>
                  {f.problematiques_titre && <h2 className={styles.titreVert}>{f.problematiques_titre}</h2>}
                  {f.problematiques_note && <p>{f.problematiques_note}</p>}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* PAGE 4 — TÉMOIGNAGES : damier photo / citation */}
        {(f.temoignages ?? []).length > 0 && (
          <section className={styles.temoignages}>
            <div className={styles.conteneur}>
              <ul className={styles.damier}>
                {f.temoignages!.flatMap((t, i) => {
                  const photo = urlPhoto(t.photo, t.photo_defaut);
                  return [
                    photo ? (
                      <li key={`photo-${t.id ?? i}`} className={styles.damierPhoto}>
                        <Image src={photo} alt="" fill sizes="(max-width: 700px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                      </li>
                    ) : null,
                    <li key={`citation-${t.id ?? i}`} className={styles.damierCitation}>
                      <blockquote>« {t.citation} »</blockquote>
                    </li>,
                  ];
                })}
              </ul>
            </div>
          </section>
        )}
      </main>

      {/* BANDEAU DU BAS (page 2 du dépliant) */}
      <footer className={styles.pied}>
        <div className={`${styles.conteneur} ${styles.piedGrille}`}>
          <div className={styles.piedLogo}>
            <Logo compact />
          </div>
          {f.pied_nom && <p className={styles.piedNom}>{f.pied_nom}</p>}
          <address className={styles.piedContact}>
            {f.pied_adresse && <span>{f.pied_adresse}</span>}
            {f.pied_telephone && <a href={`tel:${f.pied_telephone.replace(/\s/g, '')}`}>{f.pied_telephone}</a>}
            {f.pied_email && <a href={`mailto:${f.pied_email}`}>{f.pied_email}</a>}
          </address>
        </div>
      </footer>
    </>
  );
}
