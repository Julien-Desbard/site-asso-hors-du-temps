import styles from './page.module.css';

// Logo « La maison Hors du Temps — Fonds de dotation » (toit + texte), redessiné en
// SVG/HTML pour rester net à toutes les tailles. `compact` : petite version du pied de page.
export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`${styles.logo} ${compact ? styles.logoCompact : ''}`}>
      <svg className={styles.logoToit} viewBox="0 0 200 60" aria-hidden="true">
        <polyline points="4,56 100,6 196,56" fill="none" stroke="currentColor" strokeWidth="6" strokeLinejoin="miter" />
      </svg>
      <span className={styles.logoNom}>La maison</span>
      <span className={styles.logoSousNom}>Hors du temps</span>
      <span className={styles.logoFonds}>Fonds de dotation</span>
    </div>
  );
}
