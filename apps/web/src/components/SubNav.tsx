'use client';

import { useEffect, useState } from 'react';
import styles from './SubNav.module.css';

interface SubNavItem {
  id: string;
  label: string;
}

interface SubNavProps {
  items: SubNavItem[];
}

export default function SubNav({ items }: SubNavProps) {
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const targets = items
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const spy = () => {
      const y = window.scrollY + 200;
      let current = '';
      for (const el of targets) {
        if (el.offsetTop <= y) current = el.id;
      }
      setActive(current);
    };

    window.addEventListener('scroll', spy, { passive: true });
    spy();
    return () => window.removeEventListener('scroll', spy);
  }, [items]);

  return (
    <nav className={styles.subnav} aria-label="Navigation par section">
      <div className={`wrap ${styles.bar}`}>
        {items.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={active === id ? styles.active : ''}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
