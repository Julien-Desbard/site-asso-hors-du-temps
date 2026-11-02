'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './VideoYoutube.module.css';

interface VideoYoutubeProps {
  id: string;
  titre: string;
}

// Vidéo YouTube en « façade » : on n'affiche d'abord que la miniature (servie par
// notre propre domaine via next/image). L'iframe YouTube — et ses cookies — ne se
// charge qu'au clic du visiteur, ce qui évite un bandeau de consentement (RGPD).
export default function VideoYoutube({ id, titre }: VideoYoutubeProps) {
  const [lancee, setLancee] = useState(false);

  return (
    <div className={styles.cadre}>
      {lancee ? (
        <iframe
          className={styles.iframe}
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title={titre}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" className={styles.facade} onClick={() => setLancee(true)} aria-label={`Lire la vidéo : ${titre}`}>
          <Image
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 640px"
          />
          <span className={styles.lecture} aria-hidden="true">▶</span>
        </button>
      )}
    </div>
  );
}
