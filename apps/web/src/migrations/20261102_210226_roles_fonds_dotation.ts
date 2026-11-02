import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'
import { fondsDotationDefaut } from '../seed/fonds.ts'

// Rôles des comptes admin (« admin » / « fonds ») et global « Fonds de dotation ».
// Les comptes existants deviennent « admin » (valeur par défaut de la colonne).
// Le global est rempli avec le contenu du dépliant PDF, pour que l'admin s'ouvre
// sur la page telle qu'elle est en ligne et non sur un formulaire vide.

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'fonds');
  CREATE TYPE "public"."enum_fonds_dotation_chiffres_icone" AS ENUM('maison', 'lit', 'femme', 'homme', 'repas');
  CREATE TABLE "fonds_dotation_pastilles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titre" varchar NOT NULL,
  	"texte" varchar
  );
  
  CREATE TABLE "fonds_dotation_arguments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texte" varchar NOT NULL
  );
  
  CREATE TABLE "fonds_dotation_refuge_verbes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texte" varchar NOT NULL
  );
  
  CREATE TABLE "fonds_dotation_chiffres" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"valeur" varchar NOT NULL,
  	"libelle" varchar NOT NULL,
  	"icone" "enum_fonds_dotation_chiffres_icone" DEFAULT 'maison'
  );
  
  CREATE TABLE "fonds_dotation_problematiques" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"pourcentage" numeric NOT NULL,
  	"libelle" varchar NOT NULL
  );
  
  CREATE TABLE "fonds_dotation_temoignages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"citation" varchar NOT NULL,
  	"photo_id" integer,
  	"photo_defaut" varchar
  );
  
  CREATE TABLE "fonds_dotation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"photo_couverture_id" integer,
  	"photo_couverture_defaut" varchar,
  	"titre" varchar NOT NULL,
  	"projet_titre" varchar,
  	"projet_texte" varchar,
  	"collecte_titre" varchar,
  	"collecte_recolte" numeric NOT NULL,
  	"collecte_objectif_libelle" varchar,
  	"collecte_objectif" numeric NOT NULL,
  	"collecte_echeance" varchar,
  	"fonds_titre" varchar,
  	"fonds_sous_titre" varchar,
  	"fonds_photo_id" integer,
  	"fonds_photo_defaut" varchar,
  	"fonds_texte" varchar,
  	"participer_titre" varchar,
  	"participer_intro" varchar,
  	"participer_details" varchar,
  	"don_libelle" varchar,
  	"don_url" varchar,
  	"refuge_titre" varchar,
  	"asso_texte" varchar,
  	"asso_lien_libelle" varchar,
  	"asso_lien_url" varchar,
  	"chiffres_annee" varchar,
  	"problematiques_titre" varchar,
  	"problematiques_note" varchar,
  	"pied_nom" varchar,
  	"pied_adresse" varchar,
  	"pied_telephone" varchar,
  	"pied_email" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users" ADD COLUMN "role" "enum_users_role" DEFAULT 'admin' NOT NULL;
  ALTER TABLE "fonds_dotation_pastilles" ADD CONSTRAINT "fonds_dotation_pastilles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fonds_dotation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fonds_dotation_arguments" ADD CONSTRAINT "fonds_dotation_arguments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fonds_dotation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fonds_dotation_refuge_verbes" ADD CONSTRAINT "fonds_dotation_refuge_verbes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fonds_dotation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fonds_dotation_chiffres" ADD CONSTRAINT "fonds_dotation_chiffres_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fonds_dotation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fonds_dotation_problematiques" ADD CONSTRAINT "fonds_dotation_problematiques_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fonds_dotation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fonds_dotation_temoignages" ADD CONSTRAINT "fonds_dotation_temoignages_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "fonds_dotation_temoignages" ADD CONSTRAINT "fonds_dotation_temoignages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fonds_dotation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fonds_dotation" ADD CONSTRAINT "fonds_dotation_photo_couverture_id_media_id_fk" FOREIGN KEY ("photo_couverture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "fonds_dotation" ADD CONSTRAINT "fonds_dotation_fonds_photo_id_media_id_fk" FOREIGN KEY ("fonds_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "fonds_dotation_pastilles_order_idx" ON "fonds_dotation_pastilles" USING btree ("_order");
  CREATE INDEX "fonds_dotation_pastilles_parent_id_idx" ON "fonds_dotation_pastilles" USING btree ("_parent_id");
  CREATE INDEX "fonds_dotation_arguments_order_idx" ON "fonds_dotation_arguments" USING btree ("_order");
  CREATE INDEX "fonds_dotation_arguments_parent_id_idx" ON "fonds_dotation_arguments" USING btree ("_parent_id");
  CREATE INDEX "fonds_dotation_refuge_verbes_order_idx" ON "fonds_dotation_refuge_verbes" USING btree ("_order");
  CREATE INDEX "fonds_dotation_refuge_verbes_parent_id_idx" ON "fonds_dotation_refuge_verbes" USING btree ("_parent_id");
  CREATE INDEX "fonds_dotation_chiffres_order_idx" ON "fonds_dotation_chiffres" USING btree ("_order");
  CREATE INDEX "fonds_dotation_chiffres_parent_id_idx" ON "fonds_dotation_chiffres" USING btree ("_parent_id");
  CREATE INDEX "fonds_dotation_problematiques_order_idx" ON "fonds_dotation_problematiques" USING btree ("_order");
  CREATE INDEX "fonds_dotation_problematiques_parent_id_idx" ON "fonds_dotation_problematiques" USING btree ("_parent_id");
  CREATE INDEX "fonds_dotation_temoignages_order_idx" ON "fonds_dotation_temoignages" USING btree ("_order");
  CREATE INDEX "fonds_dotation_temoignages_parent_id_idx" ON "fonds_dotation_temoignages" USING btree ("_parent_id");
  CREATE INDEX "fonds_dotation_temoignages_photo_idx" ON "fonds_dotation_temoignages" USING btree ("photo_id");
  CREATE INDEX "fonds_dotation_photo_couverture_idx" ON "fonds_dotation" USING btree ("photo_couverture_id");
  CREATE INDEX "fonds_dotation_fonds_photo_idx" ON "fonds_dotation" USING btree ("fonds_photo_id");`)

  await payload.updateGlobal({ slug: 'fonds-dotation', data: fondsDotationDefaut, req })
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "fonds_dotation_pastilles" CASCADE;
  DROP TABLE "fonds_dotation_arguments" CASCADE;
  DROP TABLE "fonds_dotation_refuge_verbes" CASCADE;
  DROP TABLE "fonds_dotation_chiffres" CASCADE;
  DROP TABLE "fonds_dotation_problematiques" CASCADE;
  DROP TABLE "fonds_dotation_temoignages" CASCADE;
  DROP TABLE "fonds_dotation" CASCADE;
  ALTER TABLE "users" DROP COLUMN "role";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_fonds_dotation_chiffres_icone";`)
}
