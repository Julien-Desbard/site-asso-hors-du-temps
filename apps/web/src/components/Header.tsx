'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import styles from './Header.module.css';

const NAV_LINKS = [
  { href: '/qui-sommes-nous', label: 'Qui sommes-nous ?' },
  { href: '/etre-accueilli', label: 'Être accueilli' },
  { href: '/benevolat', label: 'Bénévolat' },
  { href: '/actualites', label: 'Actualités' },
  { href: '/fonds-de-dotation', label: 'Fonds de dotation' },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className={`${styles.header} ${open ? styles.open : ''}`}>
      <div className={styles.bar}>
        <Link href="/" className={styles.brand} onClick={() => setOpen(false)}>
          <Image src="/logo.png" alt="L'Hors du Temps" height={56} width={140} priority />
        </Link>

        <nav className={styles.nav} aria-label="Navigation principale">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={pathname === href ? styles.active : ''}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className={styles.cta}>
          <Link href="/nous-contacter" className={`btn btn-teal ${styles.pill}`} onClick={() => setOpen(false)}>
            Nous contacter
          </Link>
          <Link href="/#don" className={`btn btn-primary ${styles.pill}`} onClick={() => setOpen(false)}>
            Faire un don
          </Link>
        </div>

        <button
          className={styles.toggle}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
