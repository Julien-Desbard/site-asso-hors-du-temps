// Polices Google auto-hébergées par next/font : téléchargées au build et servies depuis
// notre domaine. Un @import vers fonts.googleapis.com serait bloqué par la CSP
// (style-src / font-src 'self') et enverrait l'IP des visiteurs à Google.
import { Caveat, Cormorant_Garamond, Kalam, Nunito, Patrick_Hand } from 'next/font/google';

export const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--nf-caveat',
  display: 'swap',
});

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--nf-cormorant',
  display: 'swap',
});

export const nunito = Nunito({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--nf-nunito',
  display: 'swap',
});

export const patrickHand = Patrick_Hand({
  subsets: ['latin'],
  weight: '400',
  variable: '--nf-patrick-hand',
  display: 'swap',
});

// Titres « feutre » de la page Fonds de dotation.
export const kalam = Kalam({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--nf-kalam',
  display: 'swap',
});
