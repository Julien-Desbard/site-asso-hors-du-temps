// Contournement du même bug d'interop CJS/ESM (@next/env, cf. scripts/migrate.mjs
// et memory project_hors_du_temps_strapi_to_payload) : `payload generate:types`
// charge payload.config.ts en dehors d'un vrai process Next (via tsx ou
// @swc-node/register), ce qui casse sur l'import de `next/cache` dans les hooks
// de revalidation (src/hooks/revalidate.ts). Seule méthode fonctionnelle :
// générer les types depuis une route API à l'intérieur d'un vrai `next dev`,
// où le bundler Next gère cet import correctement (comme le fait déjà
// migrate.mjs pour `payload migrate`).
//
// `generateTypes` n'est pas exposé par l'API publique de `payload` (seul
// `generateImportMap` l'est) : on importe le fichier interne du package via
// un chemin relatif plutôt qu'un specifier `payload/...`, pour contourner la
// restriction du champ "exports" de son package.json (qui ne s'applique
// qu'aux imports par nom de paquet, pas aux chemins relatifs).
import { spawn } from 'node:child_process';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(dirname, '..');
const routeDir = path.join(webRoot, 'src/app/ci-generate-types');
const routeFile = path.join(routeDir, 'route.ts');
const PORT = 39218;
const url = `http://localhost:${PORT}/ci-generate-types`;

const routeContent = `import { generateTypes } from '../../../node_modules/payload/dist/bin/generateTypes.js';
import config from '@payload-config';

export const dynamic = 'force-dynamic';

export async function GET() {
  await generateTypes(await config, { log: true });
  return Response.json({ ok: true });
}
`;

async function waitForServer(timeoutMs) {
  const start = Date.now();
  let lastError;
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.status < 500) return res;
    } catch (err) {
      lastError = err;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Next dev server pas prêt après ${timeoutMs}ms: ${lastError}`);
}

async function main() {
  await mkdir(routeDir, { recursive: true });
  await writeFile(routeFile, routeContent);

  const nextBin = path.join(webRoot, 'node_modules/.bin/next');
  const nextProcess = spawn(nextBin, ['dev', '-p', String(PORT)], {
    cwd: webRoot,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, PAYLOAD_DISABLE_PUSH: 'true' },
  });
  nextProcess.stdout.pipe(process.stdout);
  nextProcess.stderr.pipe(process.stderr);

  try {
    const res = await waitForServer(120_000);
    if (!res.ok) {
      throw new Error(`generate:types en échec: ${res.status} ${await res.text()}`);
    }
    console.log('[generate:types] OK', await res.json());
  } finally {
    nextProcess.kill('SIGTERM');
    await new Promise((resolve) => nextProcess.once('exit', resolve));
    await rm(routeDir, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error('[generate:types] ÉCHEC', err);
  process.exit(1);
});
