import { NextResponse, type NextRequest } from 'next/server';

// Adresses dédiées au fonds de dotation : leur page d'accueil affiche directement la
// page autonome du fonds (l'URL reste « / » dans le navigateur).
// Pour brancher le futur nom de domaine : l'ajouter ici et dans le projet Vercel.
const HOTES_FONDS = ['fonds-hors-du-temps.vercel.app'];

export function middleware(request: NextRequest) {
  const hote = request.headers.get('host')?.split(':')[0];
  if (hote && HOTES_FONDS.includes(hote)) {
    return NextResponse.rewrite(new URL('/fonds-de-dotation', request.url));
  }
  return NextResponse.next();
}

// Seule la racine est concernée : le reste (images, /admin pour Christine…) est servi
// normalement quelle que soit l'adresse.
export const config = {
  matcher: '/',
};
