# Notes sécurité — `pnpm audit`

## État au 2026-08-26

`pnpm audit --audit-level=high` remonte 38 vulnérabilités (20 high, 14 moderate,
4 low), **toutes dans des dépendances transitives** — aucune ne correspond à un
paquet en dépendance directe du projet :

- `brace-expansion` / `js-yaml` : via `eslint` (`@eslint/eslintrc`,
  `@typescript-eslint/*`) — outillage dev uniquement.
- `postcss` / `nanoid` / `esbuild` : via `vite` (toolchain de tests Vitest) et
  `next` — dev/build uniquement côté `vite`, `postcss` est aussi utilisé par
  Next.js en build.
- `fast-uri` : via `@sentry/nextjs` → `@sentry/webpack-plugin` — build only.
- `dompurify` : via `@payloadcms/ui` → `@monaco-editor/react` → `monaco-editor`
  — bundlé dans l'UI admin Payload (éditeur de code), pas exposé côté public.
- `undici` : via `@payloadcms/storage-vercel-blob` → `@vercel/blob`.
- `sharp` (libvips) : via `next` (optimisation d'images).

Le job `audit` du CI garde `continue-on-error: true` tant que cette situation
reste vraie : aucun correctif direct n'est disponible sans attendre une mise à
jour upstream de `payload`, `next`, `@sentry/nextjs` ou `eslint-config-next`.
Ré-évaluer à chaque mise à jour majeure de ces paquets, et si un vrai correctif
existe pour l'une des CVE listées, l'appliquer (`pnpm update`) plutôt que
d'attendre.

## Historique

`CVE-2025-14505` et `CVE-2026-8769` étaient auparavant listées dans
`pnpm.auditConfig.ignoreCves` (`package.json`) sans justification documentée.
Vérifié le 2026-08-26 : en désactivant temporairement ce filtre, aucune des
deux ne réapparaît dans l'audit — elles ne correspondent plus à rien dans
l'arbre de dépendances actuel (probablement des CVE qui touchaient une version
d'un paquet depuis mise à jour). Entrées retirées de `ignoreCves`.
