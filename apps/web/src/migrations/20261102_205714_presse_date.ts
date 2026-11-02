import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

// Remplace le champ texte « annee » (et le tri manuel « ordre ») des articles de presse
// par un vrai champ date, pour trier du plus récent au plus ancien.
//
// Les textes saisis en prod sont convertis avant suppression de la colonne :
// « 22 octobre 2025 », « 1er mars 2026 », « mars 2026 », « 2026 » (jour / mois
// manquants → 1). Un texte non reconnu retombe sur la première année à 4 chiffres
// trouvée, puis sur la date de création : la date (obligatoire dans l'admin) n'est
// jamais laissée vide, l'association corrigera au besoin.
//
// Conversion faite en SQL plutôt qu'en important un utilitaire TS : les migrations
// sont chargées par un import() Node natif, hors du bundler Next.
const convertir = (table: string, colTexte: string, colDate: string, colCreation: string) => sql.raw(`
  WITH lecture AS (
    SELECT id, ${colCreation} AS creation,
      regexp_match(
        btrim(regexp_replace(translate(lower(${colTexte}), 'éèêëàâäûüùôöîïç', 'eeeeaaauuuooiic'), '\\s+', ' ', 'g')),
        '^(?:([0-9]{1,2})(?:er)? )?(?:([a-z]+) )?([0-9]{4})$'
      ) AS m,
      substring(${colTexte} from '[0-9]{4}') AS annee_seule
    FROM "${table}"
  ),
  calcul AS (
    SELECT id, creation, m, annee_seule,
      array_position(ARRAY['janvier','fevrier','mars','avril','mai','juin','juillet','aout','septembre','octobre','novembre','decembre'], m[2]) AS mois
    FROM lecture
  )
  UPDATE "${table}" t SET ${colDate} = CASE
    WHEN c.m IS NOT NULL AND (c.m[2] IS NULL OR c.mois IS NOT NULL) AND (c.m[1] IS NULL OR c.m[2] IS NOT NULL)
      THEN (make_date(c.m[3]::int, coalesce(c.mois, 1), 1) + (least(greatest(coalesce(c.m[1]::int, 1), 1), 31) - 1))::timestamp AT TIME ZONE 'UTC'
    WHEN c.annee_seule IS NOT NULL
      THEN make_date(c.annee_seule::int, 1, 1)::timestamp AT TIME ZONE 'UTC'
    ELSE date_trunc('day', c.creation AT TIME ZONE 'UTC') AT TIME ZONE 'UTC'
  END
  FROM calcul c WHERE c.id = t.id;
`)

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "article_presse" ADD COLUMN "date" timestamp(3) with time zone;
  ALTER TABLE "_article_presse_v" ADD COLUMN "version_date" timestamp(3) with time zone;`)
  await db.execute(convertir('article_presse', 'annee', 'date', 'created_at'))
  await db.execute(convertir('_article_presse_v', 'version_annee', 'version_date', 'created_at'))
  await db.execute(sql`
  ALTER TABLE "article_presse" DROP COLUMN "annee";
  ALTER TABLE "article_presse" DROP COLUMN "ordre";
  ALTER TABLE "_article_presse_v" DROP COLUMN "version_annee";
  ALTER TABLE "_article_presse_v" DROP COLUMN "version_ordre";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "article_presse" ADD COLUMN "annee" varchar;
  ALTER TABLE "article_presse" ADD COLUMN "ordre" numeric DEFAULT 0;
  ALTER TABLE "_article_presse_v" ADD COLUMN "version_annee" varchar;
  ALTER TABLE "_article_presse_v" ADD COLUMN "version_ordre" numeric DEFAULT 0;
  UPDATE "article_presse" SET "annee" = extract(year FROM "date")::text;
  UPDATE "_article_presse_v" SET "version_annee" = extract(year FROM "version_date")::text;
  ALTER TABLE "article_presse" DROP COLUMN "date";
  ALTER TABLE "_article_presse_v" DROP COLUMN "version_date";`)
}
