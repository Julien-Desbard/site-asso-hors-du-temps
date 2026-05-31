import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: "Nous contacter — L'Hors du Temps",
  description:
    "Contactez L'Hors du Temps : un message suffit, nous vous répondrons dès que possible.",
};

export default function NousContacterPage() {
  return (
    <>
      <PageHero
        scrib="Écrivez-nous"
        title="Nous contacter"
        lead="Une question, une demande d'accueil, une envie d'aider, ou simplement l'envie d'échanger ? Laissez-nous un message — nous vous répondrons dès que possible."
      />

      <section className="section">
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.9fr', gap: 56, alignItems: 'start' }}>
            {/* PLACEHOLDER formulaire — implémenté Chunk 6 */}
            <div style={{ background: '#fff', borderRadius: 16, padding: '36px 34px', boxShadow: '0 18px 40px -22px rgba(0,0,0,0.22)' }}>
              <p style={{ fontFamily: 'var(--font-hand)', fontSize: 24, color: 'var(--teal-deep)', marginBottom: 12 }}>Formulaire de contact</p>
              <p style={{ color: 'var(--ink-soft)', fontSize: 16 }}>Le formulaire sera disponible très prochainement. En attendant, écrivez-nous directement :</p>
              <p style={{ marginTop: 16 }}>
                <a href="mailto:asso.horsdutemps@gmail.com" style={{ color: 'var(--brick)', fontWeight: 700 }}>asso.horsdutemps@gmail.com</a>
              </p>
            </div>

            {/* COORDONNÉES */}
            <div>
              <div className="prose">
                <h3>En direct</h3>
                <p><strong>Courriel —</strong> <a href="mailto:asso.horsdutemps@gmail.com" style={{ color: 'var(--brick)' }}>asso.horsdutemps@gmail.com</a></p>
                <p><strong>Mobile —</strong> <a href="tel:+33748101994" style={{ color: 'var(--brick)' }}>07 48 10 19 94</a></p>
                <p><strong>Adresse —</strong> 24 rue de la Fusilière, 38160 St Marcellin</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
