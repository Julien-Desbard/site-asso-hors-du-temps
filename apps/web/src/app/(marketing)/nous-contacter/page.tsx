import type { Metadata } from 'next';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import ContactForm from '@/components/ContactForm';
import PageHero from '@/components/PageHero';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: "Nous contacter — L'Hors du Temps",
  description:
    "Contactez L'Hors du Temps : un message suffit, nous vous répondrons dès que possible.",
};

const AUTO_REPLY = "« Un grand merci de votre intérêt pour notre association, nous vous répondrons dès que possible ! Bien à vous. L'équipe de l'Hors du Temps. »";

export default function NousContacterPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Nous contacter', url: 'https://assohorsdutemps.fr/nous-contacter' }]} />
      <PageHero
        scrib="Écrivez-nous"
        title="Nous contacter"
        lead="Une question, une demande d'accueil, une envie d'aider, ou simplement l'envie d'échanger ? Laissez-nous un message — nous vous répondrons dès que possible."
      />

      <section className="section">
        <div className="wrap">
          <div className={styles.grid}>
            {/* FORMULAIRE */}
            <div className={styles.formCard}>
              <ContactForm />
            </div>

            {/* COLONNE DROITE */}
            <div>
              <div className={styles.confirmBox}>
                <span className="scrib scrib-teal" style={{ fontSize: 26, transform: 'rotate(-1.5deg)', display: 'inline-block' }}>Notre réponse automatique</span>
                <p className={styles.confirmIntro}>Dès l&rsquo;envoi, vous recevez une copie de votre message accompagnée de ce mot :</p>
                <blockquote className={styles.autoReply}>{AUTO_REPLY}</blockquote>
              </div>

              <div className="prose" style={{ marginTop: 32 }}>
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
