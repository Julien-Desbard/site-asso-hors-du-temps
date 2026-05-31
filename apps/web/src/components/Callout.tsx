import Link from 'next/link';
import styles from './Callout.module.css';

interface CalloutProps {
  title: string;
  text: string;
  ctaLabel: string;
  ctaHref: string;
}

export default function Callout({ title, text, ctaLabel, ctaHref }: CalloutProps) {
  return (
    <section className="section section-cream">
      <div className="wrap">
        <div className={styles.callout}>
          <div>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.text}>{text}</p>
          </div>
          <Link href={ctaHref} className="btn btn-primary">
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
