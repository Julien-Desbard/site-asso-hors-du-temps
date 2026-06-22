# Progress — L'Hors du Temps

## Architecture
- **Front** : Next.js 15 (App Router, TS strict) → Vercel
- **CMS** : Strapi 5 (TS, admin FR) → Render (free)
- **DB** : Neon (Postgres prod) / sqlite (local)
- **Médias** : Cloudinary
- **Email** : Resend
- **Repo** : monorepo pnpm workspaces
- **CI** : GitHub Actions

---

## Chunks

| # | Nom | Branche | Statut |
|---|-----|---------|--------|
| 0 | Bootstrap monorepo + CI | `chore/bootstrap-monorepo` | ✅ Terminé |
| 1 | Strapi content-types FR | `feat/cms-content-types` | ✅ Terminé |
| 2 | Shell Next (layout, CSS, header/footer) | `feat/web-shell` | ✅ Terminé |
| 3 | Pages statiques + composants cards | `feat/web-static-pages` | ✅ Terminé |
| 4 | Intégration Actualités (liste + détail + home) | `feat/web-actualites` | ✅ Terminé |
| 5 | Intégration Équipe + Étapes accueil | `feat/web-equipe-accueil` | ✅ Terminé |
| 6 | Formulaire contact + email Resend | `feat/contact-form` | ✅ Terminé |
| 7 | Webhook ISR + SEO + RGPD + a11y | `feat/seo-revalidation-rgpd` | ✅ Terminé |
| 8 | Déploiement (Vercel + Render + Neon + Cloudinary) | `feat/deploy` | 🔍 PR ouverte — en attente déploiement réel |
| 9 | Fin mode démo — Strapi devient source unique | `main` (direct) | ✅ Terminé (2026-06-15) |

---

## Chunk 0 — Bootstrap monorepo + CI ✅

**Branche :** `chore/bootstrap-monorepo` → mergé `main` (commit `c933978`)

- `git init`, branche `main`, repo GitHub `Julien-Desbard/site-asso-hors-du-temps`
- `pnpm-workspace.yaml`, `package.json` racine, `.gitignore`, `.npmrc`
- `apps/cms/` — Strapi 5 TS, admin FR
- `apps/web/` — Next.js 15, TS strict, vitest, playwright
- `packages/types/` — types Strapi partagés
- `.github/workflows/ci.yml` — lint · typecheck · test · build

---

## Chunk 1 — Strapi content-types FR ✅

**Branche :** `feat/cms-content-types` → mergé `main` (commit `c93c8f7`)

- [x] `Article` : titre, slug (uid), date, extrait, contenu (blocks), image_principale, galerie, lien_externe, a_la_une
- [x] `MembreEquipe` : prenom, role, presentation, photo, ordre
- [x] `EtapeAccueil` : titre, tag, description, ordre
- [x] Traductions FR admin (`fr.json`) — labels champs + noms collections
- [x] Seed bootstrap : 3 articles, 3 membres, 5 étapes

---

## Chunk 2 — Shell Next (layout, CSS, header/footer) 🔍

**Branche :** `feat/web-shell` (commit `091ef75`)

**PR :** [#2 feat/web-shell → main](https://github.com/Julien-Desbard/site-asso-hors-du-temps/pull/2)

### Fait

- [x] `globals.css` : design system complet — palette cream/teal/brick, CSS custom properties, fonts Google (Cormorant Garamond, Caveat, Nunito, Patrick Hand), utilitaires `.wrap`, `.btn-*`, `.scrib`
- [x] `Header` : nav sticky backdrop-blur, lien actif `usePathname`, burger mobile
- [x] `Footer` : contact asso, réseaux sociaux (LinkedIn + Facebook), copyright
- [x] `RootLayout` : Header + main + Footer sur toutes les pages
- [x] Assets : logo, lieu.png, jardin.png dans `public/`
- [x] Fix CI : `@eslint/eslintrc` ajouté, ignore `.next/` et `next-env.d.ts`

### Critère de vérif

```bash
pnpm --filter @hors-du-temps/web dev
# http://localhost:3000 → header + footer, nav active, responsive mobile OK
```

---

## Chunk 9 — Fin mode démo ✅ (2026-06-15)

### Ce qui a été fait

- [x] `apps/cms/src/api/parametre/` — single-type (don_fonctionnement_url, don_fonds_dotation_url, benevolat_url, facebook_url) — `draftAndPublish: false`
- [x] `apps/cms/src/api/dimanche/` — single-type (flyer media image) — `draftAndPublish: false`
- [x] `apps/cms/src/index.ts` — permissions Public programmatiques pour les 7 content-types (reproductibles sur DB neuve Neon) + seed `parametre` avec URLs réelles
- [x] `apps/cms/config/middlewares.ts` — CORS corrigé (`assohorsdutemps.fr` + `localhost:3000`)
- [x] `packages/types/src/index.ts` — interfaces `Parametre` et `Dimanche` ajoutées
- [x] `apps/web/src/lib/strapi.ts` — `getParametres()` et `getDimanches()` ajoutés
- [x] `apps/web/src/app/api/revalidate/route.ts` — `ALLOWED_TAGS` étendu (frise-historiques, historique, parametre, dimanche)
- [x] `apps/web/src/app/page.tsx` — `STATIC_ARTICLES` supprimé, section actu masquée si vide, lien don depuis Strapi
- [x] `apps/web/src/app/actualites/page.tsx` — fallback inline supprimé
- [x] `apps/web/src/app/etre-accueilli/page.tsx` — `STATIC_STEPS` supprimé
- [x] `apps/web/src/app/qui-sommes-nous/page.tsx` — `FALLBACK_RECIT` / `FALLBACK_FRISE` / `PLACEHOLDER_MEMBRES` supprimés, sections masquées si vides, flyer `getDimanches()`
- [x] `apps/web/src/app/fonds-de-dotation/page.tsx` — don URL + JSON-LD urlTemplate depuis Strapi
- [x] `apps/web/src/app/layout.tsx` — `sameAs` Organization schema depuis Strapi
- [x] `apps/cms/config/plugins.ts` — provider Cloudinary configuré (lit `CLOUDINARY_NAME/KEY/SECRET` depuis env)
- [x] `@strapi/provider-upload-cloudinary` installé dans `apps/cms`

### Ce qui reste (actions manuelles uniquement — aucun code)

- [ ] **Neon** — créer projet sur [neon.tech](https://neon.tech) → copier `DATABASE_URL`
- [ ] **Cloudinary** — créer compte sur [cloudinary.com](https://cloudinary.com) → copier `CLOUDINARY_NAME` / `CLOUDINARY_KEY` / `CLOUDINARY_SECRET` (Dashboard → API Keys)
- [ ] **Vercel** — ajouter domaine Render aux `images.remotePatterns` dans `apps/web/next.config.ts` une fois l'URL Render connue (ex. `https://xxx.onrender.com`) — **1 ligne de code**
- [ ] **Render** — créer Web Service : root `apps/cms`, build `pnpm install --frozen-lockfile && pnpm build`, start `pnpm start` ; env vars : `DATABASE_CLIENT=postgres`, `DATABASE_URL`, `DATABASE_SSL=true`, `CLOUDINARY_NAME/KEY/SECRET`, `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `JWT_SECRET`
- [ ] **Vercel** — mettre à jour `NEXT_PUBLIC_STRAPI_URL=https://xxx.onrender.com` dans les env vars du projet
- [ ] **Webhook ISR** — dans Strapi Admin (Render) → Settings → Webhooks : URL `https://assohorsdutemps.fr/api/revalidate?secret=<REVALIDATION_SECRET>`, triggers `entry.publish / unpublish / update`, body `{ "model": "{{model}}" }`

---

## Chunk 8 — Déploiement 🔍

**Branche :** `feat/deploy`

### Checklist déploiement

#### 1. Neon (Postgres prod)
1. Créer un projet sur [neon.tech](https://neon.tech)
2. Copier la `DATABASE_URL` (format `postgresql://...`)
3. Ajouter dans les env vars Render :
   ```
   DATABASE_CLIENT=postgres
   DATABASE_URL=postgresql://...
   DATABASE_SSL=true
   ```

#### 2. Cloudinary
1. Créer un compte [cloudinary.com](https://cloudinary.com)
2. Ajouter dans les env vars Render :
   ```
   CLOUDINARY_NAME=xxx
   CLOUDINARY_KEY=xxx
   CLOUDINARY_SECRET=xxx
   ```

#### 3. Render (Strapi CMS)
1. New Web Service → repo `site-asso-hors-du-temps`, dossier `apps/cms`
2. Build command : `pnpm install --frozen-lockfile && pnpm build`
3. Start command : `pnpm start`
4. Env vars : toutes celles de `apps/cms/.env.example` (Neon + Cloudinary + secrets)
5. URL Render → noter pour l'étape Vercel

#### 4. Resend
1. Créer un compte [resend.com](https://resend.com), vérifier le domaine `assohorsdutemps.fr`
2. Créer une clé API → `RESEND_API_KEY`

#### 5. Vercel (Next.js)
1. Import repo → framework Next.js, root dir `apps/web`
2. Env vars (onglet Settings → Environment Variables) :
   ```
   NEXT_PUBLIC_STRAPI_URL=https://xxx.onrender.com
   NEXT_PUBLIC_STRAPI_TOKEN=<token API Strapi read-only>
   NEXT_PUBLIC_SITE_URL=https://assohorsdutemps.fr
   REVALIDATION_SECRET=<secret aléatoire>
   RESEND_API_KEY=<clé Resend>
   RESEND_FROM=contact@assohorsdutemps.fr
   CONTACT_EMAIL=asso.horsdutemps@gmail.com
   ```
3. Deploy → vérifier les pages et le formulaire

#### 6. Webhook ISR Strapi → Vercel
Dans l'admin Strapi → Settings → Webhooks → Ajouter :
- URL : `https://assohorsdutemps.fr/api/revalidate?secret=<REVALIDATION_SECRET>`
- Trigger : `entry.publish`, `entry.unpublish`, `entry.update`
- Body : `{ "model": "{{model}}" }`

---

## SEO — À faire manuellement (hors code)

> Audit réalisé session 2026-06-15. Tout ce qui pouvait être codé a été fait (robots.ts, sitemap, llms.txt, JSON-LD, BreadcrumbList, DonateAction, ISR, blocs réponse directe, H2/H3, placeholders).

### Assets manquants (bloquants)

- [ ] **OG image** — créer `/apps/web/public/og-image.png` en **1200×630 px** (photo maison + logo). Sans ça, chaque partage FB/LinkedIn/Twitter affiche l'image tronquée.
- [ ] **Favicon** — déposer dans `/apps/web/src/app/` :
  - `favicon.ico` (32×32)
  - `icon.png` (512×512)
  - `apple-icon.png` (180×180)

### Contenu éditorial (E-E-A-T)

- [ ] **Témoignages** — ajouter ≥1 témoignage anonymisé sur `/etre-accueilli` et `/benevolat`. Impact E-E-A-T majeur.
- [ ] **Presse** — quand vrais liens disponibles : remplir `PRESSE_LINKS[]` dans `qui-sommes-nous/page.tsx` (section auto-affichée dès que non vide).
- [ ] **Rapports d'activité** — même principe : remplir `RAPPORTS[]` dans `qui-sommes-nous/page.tsx` avec PDF réels.
- [ ] **Données volumétriques** — ajouter sur homepage ou /qui-sommes-nous : nb de personnes accueillies depuis 2010, fréquence Dimanches Ensemble (ex. "plus de 80 dimanches depuis 2019").
- [ ] **Email domaine propre** — migrer de `asso.horsdutemps@gmail.com` vers `contact@assohorsdutemps.fr` (signal de sérieux pour les gros dons).

### Présence externe (GEO / brand mentions)

- [ ] **LinkedIn** — créer page entreprise (15 min). Ajouter URL dans `sameAs` du JSON-LD Organization dans `layout.tsx`.
- [ ] **Wikipedia FR** — rédiger stub neutre justifié (fondée 2010, RNA W381003446, modèle unique en France). Sources citables : net1901.org, JeVeuxAider.
- [ ] **Article presse régionale** — viser Le Dauphiné Libéré ou France 3 Auvergne-Rhône-Alpes. Un article indexé = +15 pts brand mention score.
- [ ] **YouTube** — vidéo témoignage 1-2 min. Deuxième source la plus citée par les LLMs après Wikipedia.
