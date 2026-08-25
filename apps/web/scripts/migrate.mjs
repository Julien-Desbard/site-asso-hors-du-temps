// Contournement pour un bug d'interop CJS/ESM (@next/env) qui casse tout usage
// standalone de Payload (`payload migrate` CLI, ou simplement `getPayload()` via tsx)
// — voir memory project_hors_du_temps_strapi_to_payload. Seule méthode fonctionnelle :
// exécuter le code à l'intérieur d'un vrai serveur Next.js, via des routes API générées
// temporairement, puis supprimées avant `next build`.
//
// --seed (utilisé en CI) : après la migration, appelle aussi le seed (src/seed/seed.ts)
// dans le même cycle de vie du serveur Next, pour peupler la base éphémère du CI.
//
// PAYLOAD_DISABLE_PUSH=true est indispensable : `next dev` force NODE_ENV=development,
// ce qui activerait le mode "push" (auto-sync du schéma par drizzle-kit) de payload.config.ts
// avant même l'appel à la vraie migration, provoquant un prompt de confirmation interactif
// bloquant côté Payload ("dev mode... data loss will occur").
import { spawn } from 'node:child_process';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const withSeed = process.argv.includes('--seed');

const dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(dirname, '..');
const routeDir = path.join(webRoot, 'src/app/ci-migrate');
const routeFile = path.join(routeDir, 'route.ts');
const seedDir = path.join(webRoot, 'src/app/ci-seed');
const seedFile = path.join(seedDir, 'route.ts');
const healthDir = path.join(webRoot, 'src/app/ci-healthz');
const healthFile = path.join(healthDir, 'route.ts');
const PORT = 39217;
// /ci-healthz ne touche pas Payload/DB : sert de healthcheck neutre pendant
// que les tables n'existent pas encore (la home page, elle, en dépend et
// renverrait 500 tant que la migration n'a pas tourné).
const healthUrl = `http://localhost:${PORT}/ci-healthz`;
const migrateUrl = `http://localhost:${PORT}/ci-migrate`;
const seedUrl = `http://localhost:${PORT}/ci-seed`;

const routeContent = `import { getPayload } from 'payload';
import config from '@payload-config';

export const dynamic = 'force-dynamic';

export async function GET() {
  const payload = await getPayload({ config });
  await payload.db.migrate();
  return Response.json({ ok: true });
}
`;

const seedRouteContent = `import { seed } from '../../seed/seed.ts';

export const dynamic = 'force-dynamic';

export async function GET() {
  await seed();
  return Response.json({ ok: true });
}
`;

const healthRouteContent = `export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json({ ok: true });
}
`;

async function waitForServer(url, timeoutMs) {
  const start = Date.now();
  let lastError;
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.status < 500) return;
    } catch (err) {
      lastError = err;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Next dev server pas prêt après ${timeoutMs}ms: ${lastError}`);
}

async function callRoute(url, label) {
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${label} en échec: ${res.status} ${body}`);
  }
  const json = await res.json();
  console.log(`[${label}] OK`, json);
}

async function main() {
  await mkdir(routeDir, { recursive: true });
  await writeFile(routeFile, routeContent);
  await mkdir(healthDir, { recursive: true });
  await writeFile(healthFile, healthRouteContent);
  if (withSeed) {
    await mkdir(seedDir, { recursive: true });
    await writeFile(seedFile, seedRouteContent);
  }

  const nextBin = path.join(webRoot, 'node_modules/.bin/next');
  const nextProcess = spawn(nextBin, ['dev', '-p', String(PORT)], {
    cwd: webRoot,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, PAYLOAD_DISABLE_PUSH: 'true' },
  });
  nextProcess.stdout.pipe(process.stdout);
  nextProcess.stderr.pipe(process.stderr);

  try {
    await waitForServer(healthUrl, 120_000);
    await callRoute(migrateUrl, 'migrate');
    if (withSeed) {
      await callRoute(seedUrl, 'seed');
    }
  } finally {
    nextProcess.kill('SIGTERM');
    await new Promise((resolve) => nextProcess.once('exit', resolve));
    await rm(routeDir, { recursive: true, force: true });
    await rm(healthDir, { recursive: true, force: true });
    await rm(seedDir, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error('[migrate] ÉCHEC', err);
  process.exit(1);
});
