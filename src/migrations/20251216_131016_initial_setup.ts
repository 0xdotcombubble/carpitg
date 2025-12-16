import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload: _payload, req: _req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`services_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`feature\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_features_order_idx\` ON \`services_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_features_parent_id_idx\` ON \`services_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text,
  	\`description\` text NOT NULL,
  	\`price\` text NOT NULL,
  	\`category\` text NOT NULL,
  	\`image_id\` integer,
  	\`order\` numeric DEFAULT 0,
  	\`featured\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_slug_idx\` ON \`services\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`services_image_idx\` ON \`services\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`services_updated_at_idx\` ON \`services\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`services_created_at_idx\` ON \`services\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`portfolio_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`caption\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`portfolio\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`portfolio_gallery_order_idx\` ON \`portfolio_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`portfolio_gallery_parent_id_idx\` ON \`portfolio_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`portfolio_gallery_image_idx\` ON \`portfolio_gallery\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`portfolio\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text,
  	\`description\` text NOT NULL,
  	\`category\` text NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`before_after_before_id\` integer,
  	\`before_after_after_id\` integer,
  	\`vehicle_info_make\` text,
  	\`vehicle_info_model\` text,
  	\`vehicle_info_year\` numeric,
  	\`featured\` integer DEFAULT false,
  	\`order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`before_after_before_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`before_after_after_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`portfolio_slug_idx\` ON \`portfolio\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`portfolio_image_idx\` ON \`portfolio\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`portfolio_before_after_before_after_before_idx\` ON \`portfolio\` (\`before_after_before_id\`);`)
  await db.run(sql`CREATE INDEX \`portfolio_before_after_before_after_after_idx\` ON \`portfolio\` (\`before_after_after_id\`);`)
  await db.run(sql`CREATE INDEX \`portfolio_updated_at_idx\` ON \`portfolio\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`portfolio_created_at_idx\` ON \`portfolio\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`portfolio_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`services_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`portfolio\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`portfolio_rels_order_idx\` ON \`portfolio_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`portfolio_rels_parent_idx\` ON \`portfolio_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`portfolio_rels_path_idx\` ON \`portfolio_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`portfolio_rels_services_id_idx\` ON \`portfolio_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE TABLE \`pricing_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`feature\` text NOT NULL,
  	\`included\` integer DEFAULT true,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pricing\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pricing_features_order_idx\` ON \`pricing_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pricing_features_parent_id_idx\` ON \`pricing_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pricing_vehicle_types\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pricing\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pricing_vehicle_types_order_idx\` ON \`pricing_vehicle_types\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`pricing_vehicle_types_parent_idx\` ON \`pricing_vehicle_types\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pricing\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text,
  	\`description\` text NOT NULL,
  	\`price\` text NOT NULL,
  	\`duration\` text NOT NULL,
  	\`category\` text NOT NULL,
  	\`image_id\` integer,
  	\`popular\` integer DEFAULT false,
  	\`order\` numeric DEFAULT 0,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pricing_slug_idx\` ON \`pricing\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pricing_image_idx\` ON \`pricing\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`pricing_updated_at_idx\` ON \`pricing\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pricing_created_at_idx\` ON \`pricing\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`pricing_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`services_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pricing\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pricing_rels_order_idx\` ON \`pricing_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`pricing_rels_parent_idx\` ON \`pricing_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pricing_rels_path_idx\` ON \`pricing_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`pricing_rels_services_id_idx\` ON \`pricing_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`site_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_title\` text DEFAULT 'AUTÓKOZMETIKA - DETAIL STUDIO' NOT NULL,
  	\`hero_subtitle\` text DEFAULT 'Autód megérdemli a legjobbat' NOT NULL,
  	\`hero_description\` text DEFAULT 'Ahol a precizitás találkozik a szenvedéllyel. Minden autó egyedi, minden részlet számít' NOT NULL,
  	\`hero_background_image_id\` integer NOT NULL,
  	\`hero_logo_id\` integer NOT NULL,
  	\`portfolio_title\` text DEFAULT 'Elvégzett Munkáink' NOT NULL,
  	\`portfolio_subtitle\` text DEFAULT 'Válogatás a legfrissebb projektjeinkből' NOT NULL,
  	\`services_title\` text DEFAULT 'Egyedi Megoldások' NOT NULL,
  	\`services_subtitle\` text DEFAULT 'Modern technológiák és hagyományos kézműves technikák egyesítése. Minden autó egyedi kezelést érdemel.' NOT NULL,
  	\`pricing_title\` text DEFAULT 'Transzparens árképzés' NOT NULL,
  	\`pricing_subtitle\` text DEFAULT 'Válassz a négy csomag közül - mindegyik tartalmazza az anyagköltséget és a munkadíjat.' NOT NULL,
  	\`pricing_note\` text DEFAULT 'Az árak átlagosan szennyezett, 5 személyes gépjárművekre vonatkoznak. Munkás autók, extrán szennyezett autók esetében az ár eltérhet.' NOT NULL,
  	\`phone\` text DEFAULT '+36703339809' NOT NULL,
  	\`email\` text DEFAULT 'info@carpitgarage.hu' NOT NULL,
  	\`address\` text DEFAULT '1172 Budapest
  Cinkotai út 26.' NOT NULL,
  	\`instagram\` text DEFAULT 'https://www.instagram.com/carpit_grg',
  	\`facebook\` text DEFAULT 'https://www.facebook.com/share/16mtfkk7VR/',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`hero_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_hero_background_image_idx\` ON \`site_settings\` (\`hero_background_image_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_hero_logo_idx\` ON \`site_settings\` (\`hero_logo_id\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`services_id\` integer REFERENCES services(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`portfolio_id\` integer REFERENCES portfolio(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`pricing_id\` integer REFERENCES pricing(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_services_id_idx\` ON \`payload_locked_documents_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_portfolio_id_idx\` ON \`payload_locked_documents_rels\` (\`portfolio_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pricing_id_idx\` ON \`payload_locked_documents_rels\` (\`pricing_id\`);`)
}

export async function down({ db, payload: _payload, req: _req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`services_features\`;`)
  await db.run(sql`DROP TABLE \`services\`;`)
  await db.run(sql`DROP TABLE \`portfolio_gallery\`;`)
  await db.run(sql`DROP TABLE \`portfolio\`;`)
  await db.run(sql`DROP TABLE \`portfolio_rels\`;`)
  await db.run(sql`DROP TABLE \`pricing_features\`;`)
  await db.run(sql`DROP TABLE \`pricing_vehicle_types\`;`)
  await db.run(sql`DROP TABLE \`pricing\`;`)
  await db.run(sql`DROP TABLE \`pricing_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
}
