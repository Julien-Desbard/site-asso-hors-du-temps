import styles from './PageHero.module.css';

interface PageHeroProps {
  scrib: string;
  title: string;
  lead?: string;
}

export default function PageHero({ scrib, title, lead }: PageHeroProps) {
  return (
    <section className={styles.hero}>
      <div className="wrap">
        <span className={`scrib ${styles.scrib}`}>{scrib}</span>
        <h1 className={styles.title}>{title}</h1>
        {lead && <p className={styles.lead}>{lead}</p>}
      </div>
    </section>
  );
}
