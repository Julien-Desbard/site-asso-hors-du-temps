import type { ReactNode } from 'react';
import styles from './PageHero.module.css';

interface PageHeroProps {
  scrib?: string;
  title: string;
  titleVariant?: 'serif' | 'hand';
  lead?: string;
  aside?: ReactNode;
}

export default function PageHero({ scrib, title, titleVariant = 'serif', lead, aside }: PageHeroProps) {
  const content = (
    <>
      {scrib && <span className={`scrib ${styles.scrib}`}>{scrib}</span>}
      <h1 className={titleVariant === 'hand' ? styles.titleHand : styles.title}>{title}</h1>
      {lead && <p className={styles.lead}>{lead}</p>}
    </>
  );

  return (
    <section className={styles.hero}>
      <div className="wrap">
        {aside ? (
          <div className={styles.grid}>
            <div>{content}</div>
            {aside}
          </div>
        ) : (
          content
        )}
      </div>
    </section>
  );
}
