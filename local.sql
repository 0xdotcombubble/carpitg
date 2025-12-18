PRAGMA defer_foreign_keys=TRUE;
CREATE TABLE `users_sessions` (
  	`_order` integer NOT NULL,
  	`_parent_id` integer NOT NULL,
  	`id` text PRIMARY KEY NOT NULL,
  	`created_at` text,
  	`expires_at` text NOT NULL,
  	FOREIGN KEY (`_parent_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
  );
INSERT INTO "users_sessions" VALUES(1,1,'c7c8026f-5c64-42e7-bc7e-30e2f158befc','2025-12-18T08:48:34.990Z','2025-12-18T10:48:34.990Z');
INSERT INTO "users_sessions" VALUES(2,1,'a20f2d3c-d3e5-4275-b5b7-9711c460c6d8','2025-12-18T10:46:14.433Z','2025-12-18T12:46:14.433Z');
CREATE TABLE `users` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	`email` text NOT NULL,
  	`reset_password_token` text,
  	`reset_password_expiration` text,
  	`salt` text,
  	`hash` text,
  	`login_attempts` numeric DEFAULT 0,
  	`lock_until` text
  );
INSERT INTO "users" VALUES(1,'2025-12-16T11:21:12.705Z','2025-12-16T11:21:12.705Z','raphael.varszegi@gmail.com',NULL,NULL,'130543bbf58b049a89316c792f528e635dcebad4006ba035b97a58df606b2f28','0a2badcb43d7913d301aba692dc0c3310ac37587f2547082687962ff89a425fc5fe26d8ecbe9edcc933dc20a21eb0c5db2a06295de30fd548ebed2de3f04144788b104025190972e282d9436e4d4db90964e084e8c0857554840bda6196d68e541623c33c4429e0050aad9e73fb57368bc5050ccaadf67d9348b9e0c49a6ba694db641563c896b8e119bb2be9d01c735f2eaafd51488d149f8090479a341ba87ab163c1cde564fd903fd8eb76913a5ee49f9abdb030661724428948a9c9e2ca33d54dadeab9ab603d58ef3880447e0b42253a0a8c0a9f3957f33bf64b2a84ef6b871d53eb168d707f2df2387395294226d9ac5e33e4cf67d1c4f4921be31b27b13cf0923ab050dadbf4d56d997a7565c19aaa1c37cbf78696982731d2dbc1ef7982cad0ad66f736e9702cf35738485ce774484e948e94f6e1370510a0af7ab0b0e7b4430797534dc71a84b98c81a016903bca75a40c758a1f225086df8c6bb4c29d07775e4445f1a5e5d008ddb17b702af7f1e0ae42b5e215e201a0ac705036d0f9703adcfd10459af1655e1a0017f0a69ff2307e1047f2b2824e37b4308fa692f6f547a49e8f897d957ed123c6c4c1cad341e27020c092506e0ff8138d0ab43ffca7f5299789553069ba0c38bc7f2b66bda888b42ef7dfa41096a766c37c78055cedf7b0585ca2c4b1bb1a29a52f7e4300187f7f22f70b76c9959b6ebc976aa',0,NULL);
CREATE TABLE `media` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`alt` text NOT NULL,
  	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	`url` text,
  	`thumbnail_u_r_l` text,
  	`filename` text,
  	`mime_type` text,
  	`filesize` numeric,
  	`width` numeric,
  	`height` numeric
  );
INSERT INTO "media" VALUES(1,'bg','2025-12-16T13:45:46.181Z','2025-12-16T13:45:46.181Z',NULL,NULL,'background.jpg','image/jpeg',130549,888,960);
INSERT INTO "media" VALUES(2,'logo','2025-12-16T13:46:23.838Z','2025-12-16T13:46:23.838Z',NULL,NULL,'logo.svg','image/svg+xml',6734,1200,776);
INSERT INTO "media" VALUES(3,'audi','2025-12-16T14:07:53.212Z','2025-12-16T14:07:53.212Z',NULL,NULL,'image07.jpg','image/jpeg',389027,1338,1799);
INSERT INTO "media" VALUES(4,'vlogo','2025-12-18T01:13:14.724Z','2025-12-18T01:13:14.724Z',NULL,NULL,'logo.jpg','image/jpeg',60636,955,956);
INSERT INTO "media" VALUES(5,'vlogo','2025-12-18T01:14:29.656Z','2025-12-18T01:14:29.656Z',NULL,NULL,'logo-1.jpg','image/jpeg',60636,955,956);
INSERT INTO "media" VALUES(6,'vlogo','2025-12-18T01:17:36.475Z','2025-12-18T01:17:36.475Z',NULL,NULL,'logo-2.jpg','image/jpeg',60636,955,956);
INSERT INTO "media" VALUES(7,'profile','2025-12-18T01:18:43.799Z','2025-12-18T01:18:43.799Z',NULL,NULL,'image04.jpg','image/jpeg',645862,1922,2560);
INSERT INTO "media" VALUES(8,'vlogo','2025-12-18T01:25:11.107Z','2025-12-18T01:25:11.107Z',NULL,NULL,'logo-3.jpg','image/jpeg',63075,955,956);
INSERT INTO "media" VALUES(9,'asd','2025-12-18T01:30:28.700Z','2025-12-18T01:30:28.700Z',NULL,NULL,'5ebb0280.jpg','image/jpeg',214671,823,1462);
INSERT INTO "media" VALUES(10,'ads','2025-12-18T01:31:11.667Z','2025-12-18T01:31:11.667Z',NULL,NULL,'6d89f7c3.jpg','image/jpeg',159165,826,1462);
INSERT INTO "media" VALUES(11,'vlogo','2025-12-18T01:41:00.077Z','2025-12-18T01:41:00.077Z',NULL,NULL,'logo-4.jpg','image/jpeg',63075,955,956);
INSERT INTO "media" VALUES(12,'vvlogo','2025-12-18T01:50:36.293Z','2025-12-18T01:50:36.293Z',NULL,NULL,'logo-5.jpg','image/jpeg',60636,955,956);
INSERT INTO "media" VALUES(13,'asdasds','2025-12-18T01:57:43.112Z','2025-12-18T01:57:43.112Z',NULL,NULL,'logo-6.jpg','image/jpeg',60636,955,956);
INSERT INTO "media" VALUES(14,'vcard','2025-12-18T08:23:25.536Z','2025-12-18T08:23:25.536Z',NULL,NULL,'logo-7.jpg','image/jpeg',60636,955,956);
INSERT INTO "media" VALUES(15,'test','2025-12-18T08:50:26.427Z','2025-12-18T08:50:26.427Z',NULL,NULL,'IMG_0774.jpeg','image/jpeg',3825362,4243,5665);
INSERT INTO "media" VALUES(16,'audi','2025-12-18T10:46:52.099Z','2025-12-18T10:46:52.099Z',NULL,NULL,'image07-1.jpg','image/jpeg',389027,1338,1799);
CREATE TABLE `payload_locked_documents` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`global_slug` text,
  	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
INSERT INTO "payload_locked_documents" VALUES(1,'site-settings','2025-12-18T08:49:50.308Z','2025-12-18T08:49:18.635Z');
CREATE TABLE `payload_locked_documents_rels` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`order` integer,
  	`parent_id` integer NOT NULL,
  	`path` text NOT NULL,
  	`users_id` integer,
  	`media_id` integer, `services_id` integer REFERENCES services(id), `portfolio_id` integer REFERENCES portfolio(id), `pricing_id` integer REFERENCES pricing(id),
  	FOREIGN KEY (`parent_id`) REFERENCES `payload_locked_documents`(`id`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (`users_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (`media_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE cascade
  );
INSERT INTO "payload_locked_documents_rels" VALUES(1,NULL,1,'user',1,NULL,NULL,NULL,NULL);
CREATE TABLE `payload_preferences` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`key` text,
  	`value` text,
  	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
INSERT INTO "payload_preferences" VALUES(1,'collection-users','{}','2025-12-16T11:29:06.516Z','2025-12-16T11:29:06.516Z');
INSERT INTO "payload_preferences" VALUES(2,'collection-media','{}','2025-12-16T11:29:10.274Z','2025-12-16T11:29:10.274Z');
INSERT INTO "payload_preferences" VALUES(3,'collection-services','{"limit":10}','2025-12-16T13:53:24.967Z','2025-12-16T13:48:13.892Z');
INSERT INTO "payload_preferences" VALUES(4,'collection-portfolio','{}','2025-12-16T13:48:16.087Z','2025-12-16T13:48:16.087Z');
INSERT INTO "payload_preferences" VALUES(5,'collection-pricing','{}','2025-12-16T13:48:18.478Z','2025-12-16T13:48:18.478Z');
CREATE TABLE `payload_preferences_rels` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`order` integer,
  	`parent_id` integer NOT NULL,
  	`path` text NOT NULL,
  	`users_id` integer,
  	FOREIGN KEY (`parent_id`) REFERENCES `payload_preferences`(`id`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (`users_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
  );
INSERT INTO "payload_preferences_rels" VALUES(1,NULL,1,'user',1);
INSERT INTO "payload_preferences_rels" VALUES(2,NULL,2,'user',1);
INSERT INTO "payload_preferences_rels" VALUES(4,NULL,4,'user',1);
INSERT INTO "payload_preferences_rels" VALUES(5,NULL,5,'user',1);
INSERT INTO "payload_preferences_rels" VALUES(6,NULL,3,'user',1);
INSERT INTO "payload_preferences_rels" VALUES(7,NULL,3,'user',1);
CREATE TABLE `payload_migrations` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`name` text,
  	`batch` numeric,
  	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
INSERT INTO "payload_migrations" VALUES(1,'20250929_111647',1,'2025-12-16T11:01:37.881Z','2025-12-16T11:01:37.880Z');
INSERT INTO "payload_migrations" VALUES(2,'20251216_131016_initial_setup',2,'2025-12-16T13:42:17.195Z','2025-12-16T13:42:17.193Z');
ANALYZE sqlite_schema;
INSERT INTO "sqlite_stat1" VALUES('payload_migrations','payload_migrations_created_at_idx','1 1');
INSERT INTO "sqlite_stat1" VALUES('payload_migrations','payload_migrations_updated_at_idx','1 1');
INSERT INTO "sqlite_stat1" VALUES('_cf_KV','_cf_KV','1 1');
INSERT INTO "sqlite_stat1" VALUES('users','users_email_idx','1 1');
INSERT INTO "sqlite_stat1" VALUES('users','users_created_at_idx','1 1');
INSERT INTO "sqlite_stat1" VALUES('users','users_updated_at_idx','1 1');
INSERT INTO "sqlite_stat1" VALUES('payload_preferences','payload_preferences_created_at_idx','2 1');
INSERT INTO "sqlite_stat1" VALUES('payload_preferences','payload_preferences_updated_at_idx','2 1');
INSERT INTO "sqlite_stat1" VALUES('payload_preferences','payload_preferences_key_idx','2 1');
INSERT INTO "sqlite_stat1" VALUES('users_sessions','users_sessions_parent_id_idx','1 1');
INSERT INTO "sqlite_stat1" VALUES('users_sessions','users_sessions_order_idx','1 1');
INSERT INTO "sqlite_stat1" VALUES('users_sessions','sqlite_autoindex_users_sessions_1','1 1');
INSERT INTO "sqlite_stat1" VALUES('payload_preferences_rels','payload_preferences_rels_users_id_idx','2 2');
INSERT INTO "sqlite_stat1" VALUES('payload_preferences_rels','payload_preferences_rels_path_idx','2 2');
INSERT INTO "sqlite_stat1" VALUES('payload_preferences_rels','payload_preferences_rels_parent_idx','2 1');
INSERT INTO "sqlite_stat1" VALUES('payload_preferences_rels','payload_preferences_rels_order_idx','2 2');
INSERT INTO "sqlite_stat1" VALUES('services','services_created_at_idx','2 1');
INSERT INTO "sqlite_stat1" VALUES('services','services_updated_at_idx','2 1');
INSERT INTO "sqlite_stat1" VALUES('services','services_image_idx','2 2');
INSERT INTO "sqlite_stat1" VALUES('services','services_slug_idx','2 1');
INSERT INTO "sqlite_stat1" VALUES('portfolio','portfolio_created_at_idx','1 1');
INSERT INTO "sqlite_stat1" VALUES('portfolio','portfolio_updated_at_idx','1 1');
INSERT INTO "sqlite_stat1" VALUES('portfolio','portfolio_before_after_before_after_after_idx','1 1');
INSERT INTO "sqlite_stat1" VALUES('portfolio','portfolio_before_after_before_after_before_idx','1 1');
INSERT INTO "sqlite_stat1" VALUES('portfolio','portfolio_image_idx','1 1');
INSERT INTO "sqlite_stat1" VALUES('portfolio','portfolio_slug_idx','1 1');
INSERT INTO "sqlite_stat1" VALUES('services_features','services_features_parent_id_idx','6 3');
INSERT INTO "sqlite_stat1" VALUES('services_features','services_features_order_idx','6 2');
INSERT INTO "sqlite_stat1" VALUES('services_features','sqlite_autoindex_services_features_1','6 1');
INSERT INTO "sqlite_stat1" VALUES('media','media_filename_idx','3 1');
INSERT INTO "sqlite_stat1" VALUES('media','media_created_at_idx','3 1');
INSERT INTO "sqlite_stat1" VALUES('media','media_updated_at_idx','3 1');
INSERT INTO "sqlite_stat1" VALUES('site_settings','site_settings_hero_logo_idx','1 1');
INSERT INTO "sqlite_stat1" VALUES('site_settings','site_settings_hero_background_image_idx','1 1');
INSERT INTO "sqlite_stat1" VALUES('pricing_rels','pricing_rels_services_id_idx','4 4');
INSERT INTO "sqlite_stat1" VALUES('pricing_rels','pricing_rels_path_idx','4 4');
INSERT INTO "sqlite_stat1" VALUES('pricing_rels','pricing_rels_parent_idx','4 1');
INSERT INTO "sqlite_stat1" VALUES('pricing_rels','pricing_rels_order_idx','4 4');
INSERT INTO "sqlite_stat1" VALUES('pricing','pricing_created_at_idx','4 1');
INSERT INTO "sqlite_stat1" VALUES('pricing','pricing_updated_at_idx','4 1');
INSERT INTO "sqlite_stat1" VALUES('pricing','pricing_image_idx','4 4');
INSERT INTO "sqlite_stat1" VALUES('pricing','pricing_slug_idx','4 1');
INSERT INTO "sqlite_stat1" VALUES('pricing_features','pricing_features_parent_id_idx','20 5');
INSERT INTO "sqlite_stat1" VALUES('pricing_features','pricing_features_order_idx','20 4');
INSERT INTO "sqlite_stat1" VALUES('pricing_features','sqlite_autoindex_pricing_features_1','20 1');
INSERT INTO "sqlite_stat1" VALUES('payload_locked_documents','payload_locked_documents_created_at_idx','1 1');
INSERT INTO "sqlite_stat1" VALUES('payload_locked_documents','payload_locked_documents_updated_at_idx','1 1');
INSERT INTO "sqlite_stat1" VALUES('payload_locked_documents','payload_locked_documents_global_slug_idx','1 1');
INSERT INTO "sqlite_stat1" VALUES('payload_locked_documents_rels','payload_locked_documents_rels_pricing_id_idx','1 1');
INSERT INTO "sqlite_stat1" VALUES('payload_locked_documents_rels','payload_locked_documents_rels_portfolio_id_idx','1 1');
INSERT INTO "sqlite_stat1" VALUES('payload_locked_documents_rels','payload_locked_documents_rels_services_id_idx','1 1');
INSERT INTO "sqlite_stat1" VALUES('payload_locked_documents_rels','payload_locked_documents_rels_media_id_idx','1 1');
INSERT INTO "sqlite_stat1" VALUES('payload_locked_documents_rels','payload_locked_documents_rels_users_id_idx','1 1');
INSERT INTO "sqlite_stat1" VALUES('payload_locked_documents_rels','payload_locked_documents_rels_path_idx','1 1');
INSERT INTO "sqlite_stat1" VALUES('payload_locked_documents_rels','payload_locked_documents_rels_parent_idx','1 1');
INSERT INTO "sqlite_stat1" VALUES('payload_locked_documents_rels','payload_locked_documents_rels_order_idx','1 1');
CREATE TABLE `services_features` (
  	`_order` integer NOT NULL,
  	`_parent_id` integer NOT NULL,
  	`id` text PRIMARY KEY NOT NULL,
  	`feature` text NOT NULL,
  	FOREIGN KEY (`_parent_id`) REFERENCES `services`(`id`) ON UPDATE no action ON DELETE cascade
  );
INSERT INTO "services_features" VALUES(1,1,'69416387ab9566c9da535db4','Teljes belső takarítás');
INSERT INTO "services_features" VALUES(2,1,'69416428ab9566c9da535db5','Kárpittisztítás');
INSERT INTO "services_features" VALUES(3,1,'69416439ab9566c9da535db6','Műszerfal ápolása');
INSERT INTO "services_features" VALUES(1,2,'6941648dab9566c9da535db7','Kézi autómosás');
INSERT INTO "services_features" VALUES(2,2,'69416499ab9566c9da535db8','Szárítás');
INSERT INTO "services_features" VALUES(3,2,'6941649fab9566c9da535db9','Alapvédelem');
CREATE TABLE `services` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`title` text NOT NULL,
  	`slug` text,
  	`description` text NOT NULL,
  	`price` text NOT NULL,
  	`category` text NOT NULL,
  	`image_id` integer,
  	`order` numeric DEFAULT 0,
  	`featured` integer DEFAULT false,
  	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (`image_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null
  );
INSERT INTO "services" VALUES(1,'Belső tisztítás','belso-tisztitas','Teljes körű belső autótisztítási szolgáltatás, amely magában foglalja a kárpittisztítást, műszerfal ápolását és minden belső felület alapos megtisztítását.','15,000 Ft-tól','interior',NULL,0,1,'2025-12-16T13:53:13.470Z','2025-12-16T13:50:35.521Z');
INSERT INTO "services" VALUES(2,'Külső mosás','kulso-mosas','Kézi autómosás, szárítás és alapvédelem. A szolgáltatás magában foglalja a külső felületek alapos megtisztítását és védőbevonat felvitelét.','8,000 Ft-tól','exterior',NULL,1,1,'2025-12-16T13:55:01.543Z','2025-12-16T13:55:01.543Z');
CREATE TABLE `portfolio_gallery` (
  	`_order` integer NOT NULL,
  	`_parent_id` integer NOT NULL,
  	`id` text PRIMARY KEY NOT NULL,
  	`image_id` integer NOT NULL,
  	`caption` text,
  	FOREIGN KEY (`image_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (`_parent_id`) REFERENCES `portfolio`(`id`) ON UPDATE no action ON DELETE cascade
  );
CREATE TABLE `portfolio` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`title` text NOT NULL,
  	`slug` text,
  	`description` text NOT NULL,
  	`category` text NOT NULL,
  	`image_id` integer NOT NULL,
  	`before_after_before_id` integer,
  	`before_after_after_id` integer,
  	`vehicle_info_make` text,
  	`vehicle_info_model` text,
  	`vehicle_info_year` numeric,
  	`featured` integer DEFAULT false,
  	`order` numeric DEFAULT 0,
  	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (`image_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (`before_after_before_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (`before_after_after_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null
  );
INSERT INTO "portfolio" VALUES(1,'Audi RS6 - Kerámia Bevonat','audi-rs6-keramia','3 éves kerámia bevonat teljes külső védelemmel egy Audi RS6-on. A kerámia bevonat hosszú távú védelmet biztosít az UV sugárzás és a környezeti szennyeződések ellen.','ceramic',16,NULL,NULL,NULL,NULL,NULL,1,0,'2025-12-18T10:47:03.419Z','2025-12-16T14:08:23.188Z');
INSERT INTO "portfolio" VALUES(2,'Audi RS6 - Kerámia Bevonat','audi-rs6-keramia - Copy','3 éves kerámia bevonat teljes külső védelemmel egy Audi RS6-on. A kerámia bevonat hosszú távú védelmet biztosít az UV sugárzás és a környezeti szennyeződések ellen.','ceramic',16,NULL,NULL,NULL,NULL,NULL,1,1766054831696,'2025-12-18T10:47:03.419Z','2025-12-18T10:47:11.696Z');
INSERT INTO "portfolio" VALUES(3,'Audi RS6 - Kerámia Bevonat','audi-rs6-keramia - Copy - Copy','3 éves kerámia bevonat teljes külső védelemmel egy Audi RS6-on. A kerámia bevonat hosszú távú védelmet biztosít az UV sugárzás és a környezeti szennyeződések ellen.','ceramic',16,NULL,NULL,NULL,NULL,NULL,1,1766054831696,'2025-12-18T10:47:03.419Z','2025-12-18T10:47:14.009Z');
INSERT INTO "portfolio" VALUES(4,'Audi RS6 - Kerámia Bevonat','audi-rs6-keramia - Copy - Copy - Copy','3 éves kerámia bevonat teljes külső védelemmel egy Audi RS6-on. A kerámia bevonat hosszú távú védelmet biztosít az UV sugárzás és a környezeti szennyeződések ellen.','ceramic',16,NULL,NULL,NULL,NULL,NULL,1,1766054831696,'2025-12-18T10:47:03.419Z','2025-12-18T10:47:15.992Z');
CREATE TABLE `portfolio_rels` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`order` integer,
  	`parent_id` integer NOT NULL,
  	`path` text NOT NULL,
  	`services_id` integer,
  	FOREIGN KEY (`parent_id`) REFERENCES `portfolio`(`id`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (`services_id`) REFERENCES `services`(`id`) ON UPDATE no action ON DELETE cascade
  );
CREATE TABLE `pricing_features` (
  	`_order` integer NOT NULL,
  	`_parent_id` integer NOT NULL,
  	`id` text PRIMARY KEY NOT NULL,
  	`feature` text NOT NULL,
  	`included` integer DEFAULT true,
  	FOREIGN KEY (`_parent_id`) REFERENCES `pricing`(`id`) ON UPDATE no action ON DELETE cascade
  );
INSERT INTO "pricing_features" VALUES(1,1,'694353f70089fe0f4753ed7c','Kárpit és bőr tisztítás',1);
INSERT INTO "pricing_features" VALUES(2,1,'694354250089fe0f4753ed7d','Műszerfal ápolás',1);
INSERT INTO "pricing_features" VALUES(3,1,'694354300089fe0f4753ed7e','Ablak tisztítás belülről',1);
INSERT INTO "pricing_features" VALUES(4,1,'694354370089fe0f4753ed7f','Padló és lábtartó tisztítás',1);
INSERT INTO "pricing_features" VALUES(5,1,'6943543b0089fe0f4753ed80','Légkondicionáló tisztítás',1);
INSERT INTO "pricing_features" VALUES(1,2,'6943549cc9650200c8bd7cdd','Kárpit és bőr tisztítás',1);
INSERT INTO "pricing_features" VALUES(2,2,'6943549cc9650200c8bd7cde','Műszerfal ápolás',1);
INSERT INTO "pricing_features" VALUES(3,2,'6943549cc9650200c8bd7cdf','Ablak tisztítás belülről',1);
INSERT INTO "pricing_features" VALUES(4,2,'6943549cc9650200c8bd7ce0','Padló és lábtartó tisztítás',1);
INSERT INTO "pricing_features" VALUES(5,2,'6943549cc9650200c8bd7ce1','Légkondicionáló tisztítás',1);
INSERT INTO "pricing_features" VALUES(1,3,'6943549ec9650200c8bd7ce2','Kárpit és bőr tisztítás',1);
INSERT INTO "pricing_features" VALUES(2,3,'6943549ec9650200c8bd7ce3','Műszerfal ápolás',1);
INSERT INTO "pricing_features" VALUES(3,3,'6943549ec9650200c8bd7ce4','Ablak tisztítás belülről',1);
INSERT INTO "pricing_features" VALUES(4,3,'6943549ec9650200c8bd7ce5','Padló és lábtartó tisztítás',1);
INSERT INTO "pricing_features" VALUES(5,3,'6943549ec9650200c8bd7ce6','Légkondicionáló tisztítás',1);
INSERT INTO "pricing_features" VALUES(1,4,'694354a0c9650200c8bd7ce7','Kárpit és bőr tisztítás',1);
INSERT INTO "pricing_features" VALUES(2,4,'694354a0c9650200c8bd7ce8','Műszerfal ápolás',1);
INSERT INTO "pricing_features" VALUES(3,4,'694354a0c9650200c8bd7ce9','Ablak tisztítás belülről',1);
INSERT INTO "pricing_features" VALUES(4,4,'694354a0c9650200c8bd7cea','Padló és lábtartó tisztítás',1);
INSERT INTO "pricing_features" VALUES(5,4,'694354a0c9650200c8bd7ceb','Légkondicionáló tisztítás',1);
CREATE TABLE `pricing_vehicle_types` (
  	`order` integer NOT NULL,
  	`parent_id` integer NOT NULL,
  	`value` text,
  	`id` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (`parent_id`) REFERENCES `pricing`(`id`) ON UPDATE no action ON DELETE cascade
  );
CREATE TABLE `pricing` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`title` text NOT NULL,
  	`slug` text,
  	`description` text NOT NULL,
  	`price` text NOT NULL,
  	`duration` text NOT NULL,
  	`category` text NOT NULL,
  	`image_id` integer,
  	`popular` integer DEFAULT false,
  	`order` numeric DEFAULT 0,
  	`notes` text,
  	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (`image_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null
  );
INSERT INTO "pricing" VALUES(1,'Belső Tisztítás','belső-tisztítás','Komplett belső tér tisztítás és kondicionálás prémium anyagokkal. A szolgáltatás magában foglalja a teljes belső tér alapos tisztítását, kárpit és bőr felületek kondicionálását.','35.000 Ft','3-4 óra','basic',NULL,0,0,'TESZT TESZT TESZT','2025-12-18T01:10:29.753Z','2025-12-18T01:10:08.074Z');
INSERT INTO "pricing" VALUES(2,'Belső Tisztítás','belső-tisztítás - Copy','Komplett belső tér tisztítás és kondicionálás prémium anyagokkal. A szolgáltatás magában foglalja a teljes belső tér alapos tisztítását, kárpit és bőr felületek kondicionálását.','35.000 Ft','3-4 óra','basic',NULL,0,1,'TESZT TESZT TESZT','2025-12-18T01:11:07.468Z','2025-12-18T01:10:52.320Z');
INSERT INTO "pricing" VALUES(3,'Belső Tisztítás','belső-tisztítás - Copy - Copy','Komplett belső tér tisztítás és kondicionálás prémium anyagokkal. A szolgáltatás magában foglalja a teljes belső tér alapos tisztítását, kárpit és bőr felületek kondicionálását.','35.000 Ft','3-4 óra','basic',NULL,0,2,'TESZT TESZT TESZT','2025-12-18T01:11:21.078Z','2025-12-18T01:10:54.764Z');
INSERT INTO "pricing" VALUES(4,'Belső Tisztítás','belső-tisztítás - Copy - Copy - Copy','Komplett belső tér tisztítás és kondicionálás prémium anyagokkal. A szolgáltatás magában foglalja a teljes belső tér alapos tisztítását, kárpit és bőr felületek kondicionálását.','35.000 Ft','3-4 óra','basic',NULL,0,3,'TESZT TESZT TESZT','2025-12-18T01:11:36.110Z','2025-12-18T01:10:56.942Z');
CREATE TABLE `pricing_rels` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`order` integer,
  	`parent_id` integer NOT NULL,
  	`path` text NOT NULL,
  	`services_id` integer,
  	FOREIGN KEY (`parent_id`) REFERENCES `pricing`(`id`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (`services_id`) REFERENCES `services`(`id`) ON UPDATE no action ON DELETE cascade
  );
INSERT INTO "pricing_rels" VALUES(1,1,1,'services',1);
INSERT INTO "pricing_rels" VALUES(5,1,2,'services',1);
INSERT INTO "pricing_rels" VALUES(6,1,3,'services',1);
INSERT INTO "pricing_rels" VALUES(7,1,4,'services',1);
CREATE TABLE `payload_kv` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`key` text NOT NULL,
  	`data` text NOT NULL
  );
CREATE TABLE `site_settings` (
  	`id` integer PRIMARY KEY NOT NULL,
  	`hero_title` text DEFAULT 'AUTÓKOZMETIKA - DETAIL STUDIO' NOT NULL,
  	`hero_subtitle` text DEFAULT 'Autód megérdemli a legjobbat' NOT NULL,
  	`hero_description` text DEFAULT 'Ahol a precizitás találkozik a szenvedéllyel. Minden autó egyedi, minden részlet számít' NOT NULL,
  	`hero_background_image_id` integer NOT NULL,
  	`hero_logo_id` integer NOT NULL,
  	`portfolio_title` text DEFAULT 'Elvégzett Munkáink' NOT NULL,
  	`portfolio_subtitle` text DEFAULT 'Válogatás a legfrissebb projektjeinkből' NOT NULL,
  	`services_title` text DEFAULT 'Egyedi Megoldások' NOT NULL,
  	`services_subtitle` text DEFAULT 'Modern technológiák és hagyományos kézműves technikák egyesítése. Minden autó egyedi kezelést érdemel.' NOT NULL,
  	`pricing_title` text DEFAULT 'Transzparens árképzés' NOT NULL,
  	`pricing_subtitle` text DEFAULT 'Válassz a négy csomag közül - mindegyik tartalmazza az anyagköltséget és a munkadíjat.' NOT NULL,
  	`pricing_note` text DEFAULT 'Az árak átlagosan szennyezett, 5 személyes gépjárművekre vonatkoznak. Munkás autók, extrán szennyezett autók esetében az ár eltérhet.' NOT NULL,
  	`phone` text DEFAULT '+36703339809' NOT NULL,
  	`email` text DEFAULT 'info@carpitgarage.hu' NOT NULL,
  	`address` text DEFAULT '1172 Budapest
  Cinkotai út 26.' NOT NULL,
  	`instagram` text DEFAULT 'https://www.instagram.com/carpit_grg',
  	`facebook` text DEFAULT 'https://www.facebook.com/share/16mtfkk7VR/',
  	`updated_at` text,
  	`created_at` text,
  	FOREIGN KEY (`hero_background_image_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (`hero_logo_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null
  );
INSERT INTO "site_settings" VALUES(1,'AUTÓKOZMETIKA - DETAIL STUDIO','Autód megérdemli a legjobbat','Ahol a precizitás találkozik a szenvedéllyel. Minden autó egyedi, minden részlet számít',1,2,'Elvégzett Munkáink','Válogatás a legfrissebb projektjeinkből','Egyedi Megoldások','Modern technológiák és hagyományos kézműves technikák egyesítése. Minden autó egyedi kezelést érdemel.','Transzparens árképzés','Válassz a négy csomag közül - mindegyik tartalmazza az anyagköltséget és a munkadíjat.','Az árak átlagosan szennyezett, 5 személyes gépjárművekre vonatkoznak. Munkás autók, extrán szennyezett autók esetében az ár eltérhet.','+36703339809','info@carpitgarage.hu',replace('1172 Budapest\nCinkotai út 26.','\n',char(10)),'https://www.instagram.com/carpit_grg','https://www.facebook.com/share/16mtfkk7VR/','2025-12-18T00:30:16.770Z','2025-12-16T13:46:28.651Z');
CREATE INDEX `users_sessions_order_idx` ON `users_sessions` (`_order`);
CREATE INDEX `users_sessions_parent_id_idx` ON `users_sessions` (`_parent_id`);
CREATE INDEX `users_updated_at_idx` ON `users` (`updated_at`);
CREATE INDEX `users_created_at_idx` ON `users` (`created_at`);
CREATE UNIQUE INDEX `users_email_idx` ON `users` (`email`);
CREATE INDEX `media_updated_at_idx` ON `media` (`updated_at`);
CREATE INDEX `media_created_at_idx` ON `media` (`created_at`);
CREATE UNIQUE INDEX `media_filename_idx` ON `media` (`filename`);
CREATE INDEX `payload_locked_documents_global_slug_idx` ON `payload_locked_documents` (`global_slug`);
CREATE INDEX `payload_locked_documents_updated_at_idx` ON `payload_locked_documents` (`updated_at`);
CREATE INDEX `payload_locked_documents_created_at_idx` ON `payload_locked_documents` (`created_at`);
CREATE INDEX `payload_locked_documents_rels_order_idx` ON `payload_locked_documents_rels` (`order`);
CREATE INDEX `payload_locked_documents_rels_parent_idx` ON `payload_locked_documents_rels` (`parent_id`);
CREATE INDEX `payload_locked_documents_rels_path_idx` ON `payload_locked_documents_rels` (`path`);
CREATE INDEX `payload_locked_documents_rels_users_id_idx` ON `payload_locked_documents_rels` (`users_id`);
CREATE INDEX `payload_locked_documents_rels_media_id_idx` ON `payload_locked_documents_rels` (`media_id`);
CREATE INDEX `payload_preferences_key_idx` ON `payload_preferences` (`key`);
CREATE INDEX `payload_preferences_updated_at_idx` ON `payload_preferences` (`updated_at`);
CREATE INDEX `payload_preferences_created_at_idx` ON `payload_preferences` (`created_at`);
CREATE INDEX `payload_preferences_rels_order_idx` ON `payload_preferences_rels` (`order`);
CREATE INDEX `payload_preferences_rels_parent_idx` ON `payload_preferences_rels` (`parent_id`);
CREATE INDEX `payload_preferences_rels_path_idx` ON `payload_preferences_rels` (`path`);
CREATE INDEX `payload_preferences_rels_users_id_idx` ON `payload_preferences_rels` (`users_id`);
CREATE INDEX `payload_migrations_updated_at_idx` ON `payload_migrations` (`updated_at`);
CREATE INDEX `payload_migrations_created_at_idx` ON `payload_migrations` (`created_at`);
CREATE INDEX `services_features_order_idx` ON `services_features` (`_order`);
CREATE INDEX `services_features_parent_id_idx` ON `services_features` (`_parent_id`);
CREATE UNIQUE INDEX `services_slug_idx` ON `services` (`slug`);
CREATE INDEX `services_image_idx` ON `services` (`image_id`);
CREATE INDEX `services_updated_at_idx` ON `services` (`updated_at`);
CREATE INDEX `services_created_at_idx` ON `services` (`created_at`);
CREATE INDEX `portfolio_gallery_order_idx` ON `portfolio_gallery` (`_order`);
CREATE INDEX `portfolio_gallery_parent_id_idx` ON `portfolio_gallery` (`_parent_id`);
CREATE INDEX `portfolio_gallery_image_idx` ON `portfolio_gallery` (`image_id`);
CREATE UNIQUE INDEX `portfolio_slug_idx` ON `portfolio` (`slug`);
CREATE INDEX `portfolio_image_idx` ON `portfolio` (`image_id`);
CREATE INDEX `portfolio_before_after_before_after_before_idx` ON `portfolio` (`before_after_before_id`);
CREATE INDEX `portfolio_before_after_before_after_after_idx` ON `portfolio` (`before_after_after_id`);
CREATE INDEX `portfolio_updated_at_idx` ON `portfolio` (`updated_at`);
CREATE INDEX `portfolio_created_at_idx` ON `portfolio` (`created_at`);
CREATE INDEX `portfolio_rels_order_idx` ON `portfolio_rels` (`order`);
CREATE INDEX `portfolio_rels_parent_idx` ON `portfolio_rels` (`parent_id`);
CREATE INDEX `portfolio_rels_path_idx` ON `portfolio_rels` (`path`);
CREATE INDEX `portfolio_rels_services_id_idx` ON `portfolio_rels` (`services_id`);
CREATE INDEX `pricing_features_order_idx` ON `pricing_features` (`_order`);
CREATE INDEX `pricing_features_parent_id_idx` ON `pricing_features` (`_parent_id`);
CREATE INDEX `pricing_vehicle_types_order_idx` ON `pricing_vehicle_types` (`order`);
CREATE INDEX `pricing_vehicle_types_parent_idx` ON `pricing_vehicle_types` (`parent_id`);
CREATE UNIQUE INDEX `pricing_slug_idx` ON `pricing` (`slug`);
CREATE INDEX `pricing_image_idx` ON `pricing` (`image_id`);
CREATE INDEX `pricing_updated_at_idx` ON `pricing` (`updated_at`);
CREATE INDEX `pricing_created_at_idx` ON `pricing` (`created_at`);
CREATE INDEX `pricing_rels_order_idx` ON `pricing_rels` (`order`);
CREATE INDEX `pricing_rels_parent_idx` ON `pricing_rels` (`parent_id`);
CREATE INDEX `pricing_rels_path_idx` ON `pricing_rels` (`path`);
CREATE INDEX `pricing_rels_services_id_idx` ON `pricing_rels` (`services_id`);
CREATE UNIQUE INDEX `payload_kv_key_idx` ON `payload_kv` (`key`);
CREATE INDEX `site_settings_hero_background_image_idx` ON `site_settings` (`hero_background_image_id`);
CREATE INDEX `site_settings_hero_logo_idx` ON `site_settings` (`hero_logo_id`);
CREATE INDEX `payload_locked_documents_rels_services_id_idx` ON `payload_locked_documents_rels` (`services_id`);
CREATE INDEX `payload_locked_documents_rels_portfolio_id_idx` ON `payload_locked_documents_rels` (`portfolio_id`);
CREATE INDEX `payload_locked_documents_rels_pricing_id_idx` ON `payload_locked_documents_rels` (`pricing_id`);
