import type { Metadata } from 'next';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { getArticles } from '@/lib/strapi';
import type { Article } from '@hors-du-temps/types';

export const metadata: Metadata = {
  title: "Actualités — L'Hors du Temps",
  description:
    "Les nouvelles de L'Hors du Temps : événements, Dimanches Ensemble, lettres aux adhérents et vie de la maison.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function ArticleCard({ article, lead = false }: { article: Article; lead?: boolean }) {
  const img = article.image_principale;
  return (
    <article className={`card ${lead ? 'card-lead' : ''}`}>
      {lead && <span className="tape" />}
      {img ? (
        <div className="card-img">
          <Image
            src={img.url.startsWith('http') ? img.url : `${process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337'}${img.url}`}
            alt={img.alternativeText ?? article.titre}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ) : (
        <div className="card-img-ph">visuel à fournir</div>
      )}
      <div className="card-body">
        <div className="card-date">{formatDate(article.date)}</div>
        <h3>{article.titre}</h3>
        <p>{article.extrait}</p>
        <Link className="card-read" href={`/actualites/${article.slug}`}>Lire la suite</Link>
      </div>
    </article>
  );
}

export default async function ActualitesPage() {
  let articles: Article[] = [];
  try {
    articles = await getArticles();
  } catch {
    // Strapi indisponible en build statique — affiche placeholder
  }

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Actualités', url: 'https://assohorsdutemps.fr/actualites' }]} />
      <PageHero
        scrib="Des nouvelles de la maison"
        title="Actualités"
        lead="La vie de l'association au fil des saisons : événements, Dimanches Ensemble, lettres aux adhérents et petits bonheurs partagés."
      />

      <section className="section">
        <div className="wrap">
          {articles.length > 0 && (
            <div className="articles-grid">
              {articles.map((article, i) => (
                <ArticleCard key={article.id} article={article} lead={i === 0} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
