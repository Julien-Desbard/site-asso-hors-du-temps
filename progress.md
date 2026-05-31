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
| 2 | Shell Next (layout, CSS, header/footer) | `feat/web-shell` | 🔍 PR ouverte — en attente GO merge |
| 3 | Pages statiques + composants cards | `feat/web-static-pages` | ⏳ À faire |
| 4 | Intégration Actualités (liste + détail + home) | `feat/web-actualites` | ⏳ À faire |
| 5 | Intégration Équipe + Étapes accueil | `feat/web-equipe-accueil` | ⏳ À faire |
| 6 | Formulaire contact + email Resend | `feat/contact-form` | ⏳ À faire |
| 7 | Webhook ISR + SEO + RGPD + a11y | `feat/seo-revalidation-rgpd` | ⏳ À faire |
| 8 | Déploiement (Vercel + Render + Neon + Cloudinary) | `feat/deploy` | ⏳ À faire |

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
