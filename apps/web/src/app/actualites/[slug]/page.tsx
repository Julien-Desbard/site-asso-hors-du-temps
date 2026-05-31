import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getArticles } from '@/lib/strapi';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const articles = await getArticles();
    return articles.map((a) => ({ slug: a.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const article = await getArticleBySlug(slug);
    if (!article) return {};
    return {
      title: `${article.titre} — L'Hors du Temps`,
      description: article.extrait,
    };
  } catch {
    return {};
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  let article = null;
  try {
    article = await getArticleBySlug(slug);
  } catch {
    // Strapi indisponible
  }

  if (!article) notFound();

  const strapiBase = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';
  const img = article.image_principale;
  const imgUrl = img ? (img.url.startsWith('http') ? img.url : `${strapiBase}${img.url}`) : null;

  return (
    <>
      <section style={{ background: 'var(--cream)', padding: '64px 0 56px', borderBottom: '1px solid #e6dcc6' }}>
        <div className="wrap">
          <Link href="/actualites" style={{ fontFamily: 'var(--font-hand)', fontSize: 18, color: 'var(--ink-soft)', display: 'inline-block', marginBottom: 20 }}>
            ← Toutes les actualités
          </Link>
          <div className="card-date">{formatDate(article.date)}</div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 56, fontWeight: 500, lineHeight: 1.05, marginTop: 6, maxWidth: 760 }}>
            {article.titre}
          </h1>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div style={{ maxWidth: 760 }}>
            {imgUrl && (
              <div style={{ position: 'relative', height: 420, marginBottom: 40, borderRadius: 4, overflow: 'hidden' }}>
                <Image
                  src={imgUrl}
                  alt={img?.alternativeText ?? article.titre}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            )}

            <p style={{ fontSize: 20, color: 'var(--ink-soft)', marginBottom: 32, lineHeight: 1.6 }}>
              {article.extrait}
            </p>

            {/* Contenu Strapi blocks — affiché brut pour l'instant, Chunk 7 peut enrichir */}
            {article.lien_externe && (
              <a
                href={article.lien_externe}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-teal"
                style={{ display: 'inline-block', marginTop: 8 }}
              >
                Lire l&rsquo;article complet →
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
