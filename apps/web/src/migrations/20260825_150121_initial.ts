import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_articles_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__articles_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_membre_equipe_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__membre_equipe_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_etape_accueil_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__etape_accueil_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_frise_historique_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__frise_historique_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_historique_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__historique_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "articles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"slug" varchar,
  	"date" timestamp(3) with time zone,
  	"extrait" varchar,
  	"contenu" jsonb,
  	"image_principale_id" integer,
  	"lien_externe" varchar,
  	"a_la_une" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_articles_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "articles_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_articles_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_titre" varchar,
  	"version_slug" varchar,
  	"version_date" timestamp(3) with time zone,
  	"version_extrait" varchar,
  	"version_contenu" jsonb,
  	"version_image_principale_id" integer,
  	"version_lien_externe" varchar,
  	"version_a_la_une" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__articles_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_articles_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "membre_equipe" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"prenom" varchar,
  	"role" varchar,
  	"presentation" varchar,
  	"photo_id" integer,
  	"ordre" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_membre_equipe_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_membre_equipe_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_prenom" varchar,
  	"version_role" varchar,
  	"version_presentation" varchar,
  	"version_photo_id" integer,
  	"version_ordre" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__membre_equipe_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "etape_accueil" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titre" varchar,
  	"tag" varchar,
  	"description" varchar,
  	"ordre" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_etape_accueil_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_etape_accueil_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_titre" varchar,
  	"version_tag" varchar,
  	"version_description" varchar,
  	"version_ordre" numeric,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__etape_accueil_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "frise_historique" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"annee" varchar,
  	"evenement" varchar,
  	"ordre" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_frise_historique_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_frise_historique_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_annee" varchar,
  	"version_evenement" varchar,
  	"version_ordre" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__frise_historique_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"articles_id" integer,
  	"membre_equipe_id" integer,
  	"etape_accueil_id" integer,
  	"frise_historique_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "historique" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"recit" varchar,
  	"_status" "enum_historique_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_historique_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_recit" varchar,
  	"version__status" "enum__historique_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "parametre" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"don_fonctionnement_url" varchar,
  	"don_fonds_dotation_url" varchar,
  	"benevolat_url" varchar,
  	"facebook_url" varchar,
  	"mecenat_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "accueil_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"vie_commune_texte" varchar,
  	"vie_commune_image_id" integer,
  	"activites_texte" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "dimanche" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"flyer_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "articles" ADD CONSTRAINT "articles_image_principale_id_media_id_fk" FOREIGN KEY ("image_principale_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_parent_id_articles_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_image_principale_id_media_id_fk" FOREIGN KEY ("version_image_principale_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "membre_equipe" ADD CONSTRAINT "membre_equipe_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_membre_equipe_v" ADD CONSTRAINT "_membre_equipe_v_parent_id_membre_equipe_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."membre_equipe"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_membre_equipe_v" ADD CONSTRAINT "_membre_equipe_v_version_photo_id_media_id_fk" FOREIGN KEY ("version_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_etape_accueil_v" ADD CONSTRAINT "_etape_accueil_v_parent_id_etape_accueil_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."etape_accueil"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_frise_historique_v" ADD CONSTRAINT "_frise_historique_v_parent_id_frise_historique_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."frise_historique"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_membre_equipe_fk" FOREIGN KEY ("membre_equipe_id") REFERENCES "public"."membre_equipe"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_etape_accueil_fk" FOREIGN KEY ("etape_accueil_id") REFERENCES "public"."etape_accueil"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_frise_historique_fk" FOREIGN KEY ("frise_historique_id") REFERENCES "public"."frise_historique"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accueil_page" ADD CONSTRAINT "accueil_page_vie_commune_image_id_media_id_fk" FOREIGN KEY ("vie_commune_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "dimanche" ADD CONSTRAINT "dimanche_flyer_id_media_id_fk" FOREIGN KEY ("flyer_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "articles_slug_idx" ON "articles" USING btree ("slug");
  CREATE INDEX "articles_image_principale_idx" ON "articles" USING btree ("image_principale_id");
  CREATE INDEX "articles_updated_at_idx" ON "articles" USING btree ("updated_at");
  CREATE INDEX "articles_created_at_idx" ON "articles" USING btree ("created_at");
  CREATE INDEX "articles__status_idx" ON "articles" USING btree ("_status");
  CREATE INDEX "articles_rels_order_idx" ON "articles_rels" USING btree ("order");
  CREATE INDEX "articles_rels_parent_idx" ON "articles_rels" USING btree ("parent_id");
  CREATE INDEX "articles_rels_path_idx" ON "articles_rels" USING btree ("path");
  CREATE INDEX "articles_rels_media_id_idx" ON "articles_rels" USING btree ("media_id");
  CREATE INDEX "_articles_v_parent_idx" ON "_articles_v" USING btree ("parent_id");
  CREATE INDEX "_articles_v_version_version_slug_idx" ON "_articles_v" USING btree ("version_slug");
  CREATE INDEX "_articles_v_version_version_image_principale_idx" ON "_articles_v" USING btree ("version_image_principale_id");
  CREATE INDEX "_articles_v_version_version_updated_at_idx" ON "_articles_v" USING btree ("version_updated_at");
  CREATE INDEX "_articles_v_version_version_created_at_idx" ON "_articles_v" USING btree ("version_created_at");
  CREATE INDEX "_articles_v_version_version__status_idx" ON "_articles_v" USING btree ("version__status");
  CREATE INDEX "_articles_v_created_at_idx" ON "_articles_v" USING btree ("created_at");
  CREATE INDEX "_articles_v_updated_at_idx" ON "_articles_v" USING btree ("updated_at");
  CREATE INDEX "_articles_v_latest_idx" ON "_articles_v" USING btree ("latest");
  CREATE INDEX "_articles_v_rels_order_idx" ON "_articles_v_rels" USING btree ("order");
  CREATE INDEX "_articles_v_rels_parent_idx" ON "_articles_v_rels" USING btree ("parent_id");
  CREATE INDEX "_articles_v_rels_path_idx" ON "_articles_v_rels" USING btree ("path");
  CREATE INDEX "_articles_v_rels_media_id_idx" ON "_articles_v_rels" USING btree ("media_id");
  CREATE INDEX "membre_equipe_photo_idx" ON "membre_equipe" USING btree ("photo_id");
  CREATE INDEX "membre_equipe_updated_at_idx" ON "membre_equipe" USING btree ("updated_at");
  CREATE INDEX "membre_equipe_created_at_idx" ON "membre_equipe" USING btree ("created_at");
  CREATE INDEX "membre_equipe__status_idx" ON "membre_equipe" USING btree ("_status");
  CREATE INDEX "_membre_equipe_v_parent_idx" ON "_membre_equipe_v" USING btree ("parent_id");
  CREATE INDEX "_membre_equipe_v_version_version_photo_idx" ON "_membre_equipe_v" USING btree ("version_photo_id");
  CREATE INDEX "_membre_equipe_v_version_version_updated_at_idx" ON "_membre_equipe_v" USING btree ("version_updated_at");
  CREATE INDEX "_membre_equipe_v_version_version_created_at_idx" ON "_membre_equipe_v" USING btree ("version_created_at");
  CREATE INDEX "_membre_equipe_v_version_version__status_idx" ON "_membre_equipe_v" USING btree ("version__status");
  CREATE INDEX "_membre_equipe_v_created_at_idx" ON "_membre_equipe_v" USING btree ("created_at");
  CREATE INDEX "_membre_equipe_v_updated_at_idx" ON "_membre_equipe_v" USING btree ("updated_at");
  CREATE INDEX "_membre_equipe_v_latest_idx" ON "_membre_equipe_v" USING btree ("latest");
  CREATE INDEX "etape_accueil_updated_at_idx" ON "etape_accueil" USING btree ("updated_at");
  CREATE INDEX "etape_accueil_created_at_idx" ON "etape_accueil" USING btree ("created_at");
  CREATE INDEX "etape_accueil__status_idx" ON "etape_accueil" USING btree ("_status");
  CREATE INDEX "_etape_accueil_v_parent_idx" ON "_etape_accueil_v" USING btree ("parent_id");
  CREATE INDEX "_etape_accueil_v_version_version_updated_at_idx" ON "_etape_accueil_v" USING btree ("version_updated_at");
  CREATE INDEX "_etape_accueil_v_version_version_created_at_idx" ON "_etape_accueil_v" USING btree ("version_created_at");
  CREATE INDEX "_etape_accueil_v_version_version__status_idx" ON "_etape_accueil_v" USING btree ("version__status");
  CREATE INDEX "_etape_accueil_v_created_at_idx" ON "_etape_accueil_v" USING btree ("created_at");
  CREATE INDEX "_etape_accueil_v_updated_at_idx" ON "_etape_accueil_v" USING btree ("updated_at");
  CREATE INDEX "_etape_accueil_v_latest_idx" ON "_etape_accueil_v" USING btree ("latest");
  CREATE INDEX "frise_historique_updated_at_idx" ON "frise_historique" USING btree ("updated_at");
  CREATE INDEX "frise_historique_created_at_idx" ON "frise_historique" USING btree ("created_at");
  CREATE INDEX "frise_historique__status_idx" ON "frise_historique" USING btree ("_status");
  CREATE INDEX "_frise_historique_v_parent_idx" ON "_frise_historique_v" USING btree ("parent_id");
  CREATE INDEX "_frise_historique_v_version_version_updated_at_idx" ON "_frise_historique_v" USING btree ("version_updated_at");
  CREATE INDEX "_frise_historique_v_version_version_created_at_idx" ON "_frise_historique_v" USING btree ("version_created_at");
  CREATE INDEX "_frise_historique_v_version_version__status_idx" ON "_frise_historique_v" USING btree ("version__status");
  CREATE INDEX "_frise_historique_v_created_at_idx" ON "_frise_historique_v" USING btree ("created_at");
  CREATE INDEX "_frise_historique_v_updated_at_idx" ON "_frise_historique_v" USING btree ("updated_at");
  CREATE INDEX "_frise_historique_v_latest_idx" ON "_frise_historique_v" USING btree ("latest");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("articles_id");
  CREATE INDEX "payload_locked_documents_rels_membre_equipe_id_idx" ON "payload_locked_documents_rels" USING btree ("membre_equipe_id");
  CREATE INDEX "payload_locked_documents_rels_etape_accueil_id_idx" ON "payload_locked_documents_rels" USING btree ("etape_accueil_id");
  CREATE INDEX "payload_locked_documents_rels_frise_historique_id_idx" ON "payload_locked_documents_rels" USING btree ("frise_historique_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "historique__status_idx" ON "historique" USING btree ("_status");
  CREATE INDEX "_historique_v_version_version__status_idx" ON "_historique_v" USING btree ("version__status");
  CREATE INDEX "_historique_v_created_at_idx" ON "_historique_v" USING btree ("created_at");
  CREATE INDEX "_historique_v_updated_at_idx" ON "_historique_v" USING btree ("updated_at");
  CREATE INDEX "_historique_v_latest_idx" ON "_historique_v" USING btree ("latest");
  CREATE INDEX "accueil_page_vie_commune_image_idx" ON "accueil_page" USING btree ("vie_commune_image_id");
  CREATE INDEX "dimanche_flyer_idx" ON "dimanche" USING btree ("flyer_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "media" CASCADE;
  DROP TABLE "articles" CASCADE;
  DROP TABLE "articles_rels" CASCADE;
  DROP TABLE "_articles_v" CASCADE;
  DROP TABLE "_articles_v_rels" CASCADE;
  DROP TABLE "membre_equipe" CASCADE;
  DROP TABLE "_membre_equipe_v" CASCADE;
  DROP TABLE "etape_accueil" CASCADE;
  DROP TABLE "_etape_accueil_v" CASCADE;
  DROP TABLE "frise_historique" CASCADE;
  DROP TABLE "_frise_historique_v" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "historique" CASCADE;
  DROP TABLE "_historique_v" CASCADE;
  DROP TABLE "parametre" CASCADE;
  DROP TABLE "accueil_page" CASCADE;
  DROP TABLE "dimanche" CASCADE;
  DROP TYPE "public"."enum_articles_status";
  DROP TYPE "public"."enum__articles_v_version_status";
  DROP TYPE "public"."enum_membre_equipe_status";
  DROP TYPE "public"."enum__membre_equipe_v_version_status";
  DROP TYPE "public"."enum_etape_accueil_status";
  DROP TYPE "public"."enum__etape_accueil_v_version_status";
  DROP TYPE "public"."enum_frise_historique_status";
  DROP TYPE "public"."enum__frise_historique_v_version_status";
  DROP TYPE "public"."enum_historique_status";
  DROP TYPE "public"."enum__historique_v_version_status";`)
}
