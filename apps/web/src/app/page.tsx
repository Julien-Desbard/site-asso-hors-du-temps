export default function HomePage() {
  return (
    <section style={{ padding: '80px 0', background: 'var(--cream)' }}>
      <div className="wrap">
        <span className="scrib" style={{ fontSize: 32 }}>Bienvenue à L&apos;Hors du Temps</span>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 64, fontWeight: 500, lineHeight: 1.05, marginTop: 8 }}>
          Site en cours de construction.
        </h1>
        <p style={{ marginTop: 20, fontSize: 18, color: 'var(--ink-soft)' }}>
          Le contenu arrive bientôt.
        </p>
      </div>
    </section>
  );
}
