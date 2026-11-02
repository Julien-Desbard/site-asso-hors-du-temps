import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import { middleware } from './middleware';

const requete = (url: string, host: string) => new NextRequest(url, { headers: { host } });

describe('middleware — adresse dédiée au fonds de dotation', () => {
  it('affiche la page du fonds à la racine de l’adresse dédiée', () => {
    const reponse = middleware(requete('https://fonds-hors-du-temps.vercel.app/', 'fonds-hors-du-temps.vercel.app'));

    expect(reponse.headers.get('x-middleware-rewrite')).toBe('https://fonds-hors-du-temps.vercel.app/fonds-de-dotation');
  });

  it('laisse la page d’accueil du site principal intacte', () => {
    const reponse = middleware(requete('https://site-asso-hors-du-temps.vercel.app/', 'site-asso-hors-du-temps.vercel.app'));

    expect(reponse.headers.get('x-middleware-rewrite')).toBeNull();
  });

  it('ignore le port éventuel dans l’en-tête Host', () => {
    const reponse = middleware(requete('http://fonds-hors-du-temps.vercel.app:3000/', 'fonds-hors-du-temps.vercel.app:3000'));

    expect(reponse.headers.get('x-middleware-rewrite')).toContain('/fonds-de-dotation');
  });
});
