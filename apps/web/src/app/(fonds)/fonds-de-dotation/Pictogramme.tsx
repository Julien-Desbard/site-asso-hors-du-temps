import type { FondsDotation } from '@/payload-types';

type Icone = NonNullable<NonNullable<FondsDotation['chiffres']>[number]['icone']>;

// Pictogrammes des chiffres clés (page 3 du dépliant), dessinés en SVG simple.
const TRACES: Record<Icone, React.ReactNode> = {
  maison: (
    <>
      <path d="M8 30 L32 10 L56 30 Z" />
      <rect x="14" y="30" width="36" height="24" />
      <rect x="28" y="40" width="8" height="14" fill="#fff" />
    </>
  ),
  lit: (
    <>
      <rect x="6" y="18" width="6" height="34" />
      <circle cx="21" cy="30" r="6" />
      <rect x="29" y="26" width="29" height="12" rx="3" />
      <rect x="6" y="38" width="52" height="8" />
      <rect x="52" y="38" width="6" height="14" />
    </>
  ),
  femme: (
    <>
      <circle cx="32" cy="10" r="6" />
      <path d="M32 18 L44 44 H20 Z" />
      <rect x="25" y="44" width="5" height="16" />
      <rect x="34" y="44" width="5" height="16" />
    </>
  ),
  homme: (
    <>
      <circle cx="32" cy="10" r="6" />
      <rect x="23" y="18" width="18" height="24" rx="4" />
      <rect x="24" y="40" width="7" height="20" />
      <rect x="33" y="40" width="7" height="20" />
    </>
  ),
  repas: (
    <>
      <circle cx="32" cy="32" r="18" />
      <circle cx="32" cy="32" r="11" fill="#fff" />
      <rect x="5" y="12" width="4" height="40" />
      <rect x="55" y="12" width="4" height="40" />
    </>
  ),
};

export default function Pictogramme({ icone }: { icone: Icone | null | undefined }) {
  return (
    <svg viewBox="0 0 64 64" width="64" height="64" fill="currentColor" aria-hidden="true">
      {TRACES[icone ?? 'maison']}
    </svg>
  );
}
