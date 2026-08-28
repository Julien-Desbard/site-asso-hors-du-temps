import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_article_presse_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__article_presse_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_rapport_activite_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__rapport_activite_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "article_presse" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"source" varchar,
  	"annee" varchar,
  	"lien" varchar,
  	"ordre" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_article_presse_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_article_presse_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_titre" varchar,
  	"version_source" varchar,
  	"version_annee" varchar,
  	"version_lien" varchar,
  	"version_ordre" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__article_presse_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "rapport_activite" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"annee" varchar,
  	"titre" varchar,
  	"note" varchar,
  	"fichier_id" integer,
  	"ordre" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_rapport_activite_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_rapport_activite_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_annee" varchar,
  	"version_titre" varchar,
  	"version_note" varchar,
  	"version_fichier_id" integer,
  	"version_ordre" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__rapport_activite_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "benevolat_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"note_manuscrite" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "article_presse_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "rapport_activite_id" integer;
  ALTER TABLE "_article_presse_v" ADD CONSTRAINT "_article_presse_v_parent_id_article_presse_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."article_presse"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "rapport_activite" ADD CONSTRAINT "rapport_activite_fichier_id_media_id_fk" FOREIGN KEY ("fichier_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_rapport_activite_v" ADD CONSTRAINT "_rapport_activite_v_parent_id_rapport_activite_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."rapport_activite"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_rapport_activite_v" ADD CONSTRAINT "_rapport_activite_v_version_fichier_id_media_id_fk" FOREIGN KEY ("version_fichier_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "article_presse_updated_at_idx" ON "article_presse" USING btree ("updated_at");
  CREATE INDEX "article_presse_created_at_idx" ON "article_presse" USING btree ("created_at");
  CREATE INDEX "article_presse__status_idx" ON "article_presse" USING btree ("_status");
  CREATE INDEX "_article_presse_v_parent_idx" ON "_article_presse_v" USING btree ("parent_id");
  CREATE INDEX "_article_presse_v_version_version_updated_at_idx" ON "_article_presse_v" USING btree ("version_updated_at");
  CREATE INDEX "_article_presse_v_version_version_created_at_idx" ON "_article_presse_v" USING btree ("version_created_at");
  CREATE INDEX "_article_presse_v_version_version__status_idx" ON "_article_presse_v" USING btree ("version__status");
  CREATE INDEX "_article_presse_v_created_at_idx" ON "_article_presse_v" USING btree ("created_at");
  CREATE INDEX "_article_presse_v_updated_at_idx" ON "_article_presse_v" USING btree ("updated_at");
  CREATE INDEX "_article_presse_v_latest_idx" ON "_article_presse_v" USING btree ("latest");
  CREATE INDEX "rapport_activite_fichier_idx" ON "rapport_activite" USING btree ("fichier_id");
  CREATE INDEX "rapport_activite_updated_at_idx" ON "rapport_activite" USING btree ("updated_at");
  CREATE INDEX "rapport_activite_created_at_idx" ON "rapport_activite" USING btree ("created_at");
  CREATE INDEX "rapport_activite__status_idx" ON "rapport_activite" USING btree ("_status");
  CREATE INDEX "_rapport_activite_v_parent_idx" ON "_rapport_activite_v" USING btree ("parent_id");
  CREATE INDEX "_rapport_activite_v_version_version_fichier_idx" ON "_rapport_activite_v" USING btree ("version_fichier_id");
  CREATE INDEX "_rapport_activite_v_version_version_updated_at_idx" ON "_rapport_activite_v" USING btree ("version_updated_at");
  CREATE INDEX "_rapport_activite_v_version_version_created_at_idx" ON "_rapport_activite_v" USING btree ("version_created_at");
  CREATE INDEX "_rapport_activite_v_version_version__status_idx" ON "_rapport_activite_v" USING btree ("version__status");
  CREATE INDEX "_rapport_activite_v_created_at_idx" ON "_rapport_activite_v" USING btree ("created_at");
  CREATE INDEX "_rapport_activite_v_updated_at_idx" ON "_rapport_activite_v" USING btree ("updated_at");
  CREATE INDEX "_rapport_activite_v_latest_idx" ON "_rapport_activite_v" USING btree ("latest");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_article_presse_fk" FOREIGN KEY ("article_presse_id") REFERENCES "public"."article_presse"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_rapport_activite_fk" FOREIGN KEY ("rapport_activite_id") REFERENCES "public"."rapport_activite"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_article_presse_id_idx" ON "payload_locked_documents_rels" USING btree ("article_presse_id");
  CREATE INDEX "payload_locked_documents_rels_rapport_activite_id_idx" ON "payload_locked_documents_rels" USING btree ("rapport_activite_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "article_presse" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_article_presse_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rapport_activite" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_rapport_activite_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "benevolat_page" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "article_presse" CASCADE;
  DROP TABLE "_article_presse_v" CASCADE;
  DROP TABLE "rapport_activite" CASCADE;
  DROP TABLE "_rapport_activite_v" CASCADE;
  DROP TABLE "benevolat_page" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_article_presse_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_rapport_activite_fk";
  
  DROP INDEX "payload_locked_documents_rels_article_presse_id_idx";
  DROP INDEX "payload_locked_documents_rels_rapport_activite_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "article_presse_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "rapport_activite_id";
  DROP TYPE "public"."enum_article_presse_status";
  DROP TYPE "public"."enum__article_presse_v_version_status";
  DROP TYPE "public"."enum_rapport_activite_status";
  DROP TYPE "public"."enum__rapport_activite_v_version_status";`)
}
