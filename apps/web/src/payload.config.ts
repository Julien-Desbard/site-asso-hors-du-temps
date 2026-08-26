import path from 'path';
import { fileURLToPath } from 'url';
import { buildConfig } from 'payload';
import { fr } from '@payloadcms/translations/languages/fr';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import { Media } from './collections/Media.ts';
import { Articles } from './collections/Articles.ts';
import { MembreEquipe } from './collections/MembreEquipe.ts';
import { EtapeAccueil } from './collections/EtapeAccueil.ts';
import { FriseHistorique } from './collections/FriseHistorique.ts';
import { Historique } from './globals/Historique.ts';
import { Parametre } from './globals/Parametre.ts';
import { AccueilPage } from './globals/AccueilPage.ts';
import { Dimanche } from './globals/Dimanche.ts';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  collections: [Media, Articles, MembreEquipe, EtapeAccueil, FriseHistorique],
  globals: [Historique, Parametre, AccueilPage, Dimanche],
  editor: lexicalEditor(),
  i18n: {
    supportedLanguages: { fr },
    fallbackLanguage: 'fr',
  },
  secret: process.env.PAYLOAD_SECRET as string,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL as string,
      ssl: process.env.DATABASE_URL?.includes('localhost')
        ? false
        : { rejectUnauthorized: true },
    },
    // Postgres en prod exige des migrations explicites (`payload migrate`) ;
    // le mode "push" (auto-sync du schéma) n'est utilisable qu'en dev.
    // PAYLOAD_DISABLE_PUSH : utilisé par scripts/migrate.mjs, qui lance ce
    // config via `next dev` (donc NODE_ENV=development) pour contourner un bug
    // d'interop CJS/ESM de `payload migrate` en script standalone — push doit
    // rester désactivé même en mode dev le temps d'exécuter la vraie migration.
    push: process.env.NODE_ENV !== 'production' && process.env.PAYLOAD_DISABLE_PUSH !== 'true',
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  plugins: [
    vercelBlobStorage({
      collections: {
        // disablePayloadAccessControl : sert l'URL Vercel Blob directement
        // (CDN) plutôt que de proxifier chaque image via une route Payload.
        media: { disablePayloadAccessControl: true },
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      clientUploads: true,
    }),
  ],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
});
