# Plan — Alimenter le site Vercel par Strapi (fin du mode démo)

## Context

Le site `hors_du_temps` (monorepo pnpm : `apps/web` Next.js 15 sur Vercel, `apps/cms` Strapi 5) tourne en **mode démo** : sur Vercel, le contenu affiché vient de **fallbacks hardcodés** dans les pages, pas de Strapi. Raison : Strapi n'est pas hébergé en prod (il tourne seulement en local sur le Mac), et les permissions publiques de l'API Strapi sont incomplètes.

Le client veut commencer à **tester Strapi** pour éditer le contenu. Objectif : tout ce qui est éditable doit être **réellement alimenté par Strapi sur Vercel**, fallbacks supprimés.

### Décisions validées
- **Hébergement Strapi** : Render (Strapi) + Neon (Postgres) + Cloudinary (médias). Conforme à `progress.md`.
- **Fallbacks** : **supprimés**. Strapi = source unique. En cas d'échec fetch → section vide (pas de crash 500), pas de contenu hardcodé.
- **Liens de don** : tous éditables (fonctionnement, fonds dotation, bénévolat JeVeuxAider, réseaux sociaux).
- **Card Dimanches Ensemble** : image flyer (media) éditable, remplace le placeholder `flyer-ph`.

### Déjà fait (rien à coder)
- **Étapes d'accueil `ordre`** : champ `ordre` (integer, required, min 1) existe déjà dans le schéma ; tri `ordre:asc` déjà appliqué dans `apps/web/src/lib/strapi.ts:63`. ✓
- **Historique** (paragraphe page qui-sommes-nous) : single-type déjà câblé via `getHistorique()`. ✓ (manque juste déploiement + publication)
- **Actualités** : déjà câblées via `getArticles()`. ✓ (manque permissions publiques + déploiement)
- **Strapi 5** retourne par défaut uniquement les entrées **publiées** sur les `find` → pas besoin d'ajouter de filtre `publishedAt`.

---

## Phase 1 — Strapi CMS (`apps/cms`)

### 1.1 Nouveau single-type « Paramètres » (liens éditables)
Créer `apps/cms/src/api/parametre/` (content-type + controller/route/service). Schéma `singleType`, `draftAndPublish: false` :
- `don_fonctionnement_url` (string) — HelloAsso « donner simplement »
- `don_fonds_dotation_url` (string) — HelloAsso « rachat de la maison »
- `benevolat_url` (string) — JeVeuxAider
- `facebook_url` (string)

### 1.2 Nouveau single-type « Dimanches Ensemble » (flyer)
Créer `apps/cms/src/api/dimanche/`. Schéma `singleType`, `draftAndPublish: false` :
- `flyer` (media, single, images uniquement)

### 1.3 Permissions publiques API — programmatiques
Dans `apps/cms/src/index.ts` `bootstrap()`, ajouter attribution automatique au rôle **Public** des permissions `find`/`findOne` pour : `article`, `membre-equipe`, `etape-accueil`, `frise-historique`, `historique`, `parametre`, `dimanche`.
Raison : sur Neon (DB neuve), permissions réinitialisées → les coder les rend reproductibles. `NEXT_PUBLIC_STRAPI_TOKEN` reste vide.

### 1.4 Corriger le CORS (bug)
`apps/cms/config/middlewares.ts` pointe vers le mauvais projet (`bar-du-centre.vercel.app`, `bdc-angers.fr`). Remplacer par :
```
"https://assohorsdutemps.fr", "http://localhost:3000"
```

### 1.5 Seed
Étendre `seedData` dans `apps/cms/src/index.ts` : seed du single-type `parametre` avec URLs actuelles :
- Don fonctionnement : `https://www.helloasso.com/associations/l-hors-du-temps/formulaires/2`
- Don fonds dotation : `https://www.helloasso.com/associations/l-hors-du-temps/formulaires/2`
- Bénévolat : `https://www.jeveuxaider.gouv.fr/organisations/18543-ensemble-pour-l-hors-du-temps`
- Facebook : `https://www.facebook.com/people/Association-lHors-du-temps/61583118786303/`

`dimanche` laissé vide (flyer ajouté par le client). Seed existant inchangé.

---

## Phase 2 — Front Next.js (`apps/web` + `packages/types`)

### 2.1 Types partagés
`packages/types/src/index.ts` : ajouter interfaces `Parametre` (4 URLs string) et `Dimanche` (`flyer: StrapiImage | null`).

### 2.2 Couche fetch
`apps/web/src/lib/strapi.ts` : ajouter `getParametres()` et `getDimanches()` (single-types, `populate=flyer` pour dimanche).

### 2.3 Webhook revalidation
`apps/web/src/app/api/revalidate/route.ts` : étendre `ALLOWED_TAGS` : ajouter `frise-historiques`, `historique`, `parametre`, `dimanche` (actuellement manquants).

### 2.4 Suppression des fallbacks + branchement Strapi
Pattern : retirer constantes hardcodées, fetch Strapi direct, `try/catch` → section vide si Strapi indispo.

- **`apps/web/src/app/page.tsx`** : supprimer `STATIC_ARTICLES` ; lien don depuis `getParametres().don_fonctionnement_url`.
- **`apps/web/src/app/actualites/page.tsx`** : supprimer bloc fallback inline.
- **`apps/web/src/app/etre-accueilli/page.tsx`** : supprimer `STATIC_STEPS`.
- **`apps/web/src/app/qui-sommes-nous/page.tsx`** : supprimer `FALLBACK_RECIT`, `FALLBACK_FRISE`, `PLACEHOLDER_MEMBRES` ; remplacer `<div className="flyer-ph">` (ligne 153) par image flyer `getDimanches()` via `next/image` (placeholder visuel si pas d'image).
- **`apps/web/src/app/fonds-de-dotation/page.tsx`** : bouton don + `urlTemplate` du JSON-LD depuis `getParametres().don_fonds_dotation_url`.
- **`apps/web/src/app/layout.tsx`** : `sameAs` du schema Organization depuis `getParametres()`.

---

## Phase 3 — Déploiement prod (actions manuelles)

1. **Neon** : créer projet Postgres → `DATABASE_URL`.
2. **Cloudinary** : créer compte → `CLOUDINARY_NAME/KEY/SECRET`. Installer `@strapi/provider-upload-cloudinary`, configurer `apps/cms/config/plugins.ts`.
3. **Render** : Web Service, root `apps/cms`, build `pnpm install --frozen-lockfile && pnpm build`, start `pnpm start`. Env vars Strapi + Neon + Cloudinary.
4. **Vercel** : root `apps/web`. Env : `NEXT_PUBLIC_STRAPI_URL=https://<render>.onrender.com`, `REVALIDATION_SECRET`, `RESEND_*`. Ajouter domaine Render aux `images.remotePatterns` de `next.config`.
5. **Webhook ISR** : Strapi Admin → Settings → Webhooks → `https://assohorsdutemps.fr/api/revalidate?secret=<REVALIDATION_SECRET>`, triggers `entry.publish/unpublish/update`, body `{ "model": "{{model}}" }`.

---

## Phase 4 — Vérification

1. Local : `pnpm dev` → modifier contenu Strapi → publier → vérifier front (`localhost:3000`). Tester : article, étapes ordre, frise, historique, liens don, flyer dimanche.
2. Permissions : `curl localhost:1337/api/articles` → 200 sans token pour les 7 types.
3. Build : `pnpm -r build` + `pnpm -r typecheck` passent.
4. Prod : éditer Strapi Render → webhook rafraîchit Vercel → contenu Strapi s'affiche (plus de fallback).

---

## Fichiers clés
- Strapi : `apps/cms/src/api/{parametre,dimanche}/` (nouveaux), `apps/cms/src/index.ts`, `apps/cms/config/middlewares.ts`, `apps/cms/config/plugins.ts`
- Front : `apps/web/src/lib/strapi.ts`, `apps/web/src/app/api/revalidate/route.ts`, `apps/web/src/app/{page,layout}.tsx`, `apps/web/src/app/{actualites,etre-accueilli,qui-sommes-nous,fonds-de-dotation}/page.tsx`
- Types : `packages/types/src/index.ts`
