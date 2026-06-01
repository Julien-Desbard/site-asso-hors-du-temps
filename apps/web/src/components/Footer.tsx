import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.bar}>
        <div className={styles.brand}>
          <Image src="/logo.png" alt="L'Hors du Temps" height={76} width={190} />
          <p>Une maison pour souffler, à Saint-Marcellin en Isère. Un lieu paisible, pour un temps de vie partagé.</p>
        </div>

        <div>
          <h5 className={styles.sectionTitle}>Nous contacter</h5>
          <div className={styles.contactName}>Association Ensemble pour l&rsquo;Hors du temps</div>
          <ul className={styles.contactList}>
            <li>
              <span className={styles.k}>Adresse</span>
              <span>24 rue de la Fusilière, 38160 St Marcellin</span>
            </li>
            <li>
              <span className={styles.k}>Courriel</span>
              <a href="mailto:asso.horsdutemps@gmail.com">asso.horsdutemps@gmail.com</a>
            </li>
            <li>
              <span className={styles.k}>Mobile</span>
              <a href="tel:+33748101994">07 48 10 19 94</a>
            </li>
          </ul>
          <div className={styles.socials}>
            <a
              href="https://www.linkedin.com/company/association-lhorsdutemps"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width={19} height={19}>
                <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.76-2.05 4.02 0 4.76 2.65 4.76 6.1V21h-4v-5.3c0-1.26-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21H9z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/people/Association-lHors-du-temps/61583118786303/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width={19} height={19}>
                <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.8-.1-1.6-.15-2.4-.15-2.4 0-4.05 1.47-4.05 4.16V9.9H7.5V13h2.75v8z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© L&rsquo;Hors du Temps {new Date().getFullYear()} — Association loi 1901</span>
        <span>
          <Link href="/mentions-legales">Mentions légales</Link>
          {' · '}
          <Link href="/confidentialite">Politique de confidentialité</Link>
        </span>
      </div>
    </footer>
  );
}
