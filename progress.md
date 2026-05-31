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
| 1 | Strapi content-types FR | `feat/cms-content-types` | ⏳ À faire |
| 2 | Shell Next (layout, CSS, header/footer) | `feat/web-shell` | ⏳ À faire |
| 3 | Pages statiques + composants cards | `feat/web-static-pages` | ⏳ À faire |
| 4 | Intégration Actualités (liste + détail + home) | `feat/web-actualites` | ⏳ À faire |
| 5 | Intégration Équipe + Étapes accueil | `feat/web-equipe-accueil` | ⏳ À faire |
| 6 | Formulaire contact + email Resend | `feat/contact-form` | ⏳ À faire |
| 7 | Webhook ISR + SEO + RGPD + a11y | `feat/seo-revalidation-rgpd` | ⏳ À faire |
| 8 | Déploiement (Vercel + Render + Neon + Cloudinary) | `feat/deploy` | ⏳ À faire |

---

## Chunk 0 — Bootstrap monorepo + CI
**Branche :** `chore/bootstrap-monorepo`
**Critère :** `pnpm -r typecheck/build` verts, CI configurée

### Fait
- [x] `git init`, branche `main`
- [x] `pnpm-workspace.yaml` + `package.json` racine
- [x] `.gitignore` racine
- [x] `apps/cms/` — Strapi 5 TS, admin FR, pattern bdc-strapi-api
- [x] `apps/web/` — Next.js 15, TS strict, vitest, playwright
- [x] `packages/types/` — types Strapi partagés
- [x] `packages/config/` — placeholder
- [x] `.github/workflows/ci.yml`
- [x] `progress.md`

### En attente
- [ ] `pnpm install` + vérif typecheck/build local
- [ ] Premier commit
- [ ] Merge `main` (sur GO)

---

## Chunk 1 — Strapi content-types FR
**Branche :** `feat/cms-content-types`

### Contenu-types à créer
- `Article` : titre, slug, date, extrait, contenu (blocks), image_principale, galerie, lien_externe, a_la_une
- `MembreEquipe` : prenom, role, presentation, photo, ordre
- `EtapeAccueil` : titre, tag, description, ordre

### Critère
- Admin FR accessible
- API REST `/api/articles`, `/api/membre-equipes`, `/api/etape-accueils` renvoient JSON
- Seed de données de démo OK
