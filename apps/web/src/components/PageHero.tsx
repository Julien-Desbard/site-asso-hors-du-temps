import type { ReactNode } from 'react';
import styles from './PageHero.module.css';

interface PageHeroProps {
  scrib?: string;
  scribGap?: boolean;
  title: string;
  titleVariant?: 'serif' | 'hand';
  lead?: string;
  aside?: ReactNode;
  tightBottom?: boolean;
}

export default function PageHero({ scrib, scribGap, title, titleVariant = 'serif', lead, aside, tightBottom }: PageHeroProps) {
  const content = (
    <>
      {scrib && <span className={`scrib ${styles.scrib} ${scribGap ? styles.scribWide : ''}`}>{scrib}</span>}
      <h1 className={titleVariant === 'hand' ? styles.titleHand : styles.title}>{title}</h1>
      {lead && <p className={styles.lead}>{lead}</p>}
    </>
  );

  return (
    <section className={`${styles.hero} ${tightBottom ? styles.heroTightBottom : ''}`}>
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
