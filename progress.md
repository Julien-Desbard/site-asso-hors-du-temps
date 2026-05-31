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
