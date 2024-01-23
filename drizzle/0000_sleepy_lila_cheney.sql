DO $$ BEGIN
 CREATE TYPE "eventType" AS ENUM('event_type_open', 'event_type_friends', 'event_type_collab', 'event_type_closed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "requestStatus" AS ENUM('PENDING', 'ACCEPTED', 'DECLINED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "game_invites" (
	"user_id" varchar,
	"game_id" serial NOT NULL,
	"inviteText" varchar(80)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "games" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"yearPublished" smallint,
	"playingTime" smallint,
	"isExpansion" boolean,
	"minPlayers" smallint,
	"maxPlayers" smallint,
	"averageRating" text,
	"thumbnail" text,
	"image" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_favorite_games" (
	"user_id" varchar NOT NULL,
	"game_id" serial NOT NULL,
	CONSTRAINT user_favorite_games_user_id_game_id PRIMARY KEY("user_id","game_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_game_collection" (
	"user_id" varchar NOT NULL,
	"game_id" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "event_dates" (
	"date" date NOT NULL,
	"start_time" varchar(5) NOT NULL,
	"event_id" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "event_games" (
	"event_id" serial NOT NULL,
	"game_id" serial NOT NULL,
	"votes" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "event_users" (
	"event_id" serial NOT NULL,
	"player_id" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date DEFAULT now() NOT NULL,
	"time" timestamp DEFAULT now() NOT NULL,
	"organizer_id" varchar NOT NULL,
	"event_type" "eventType" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth_keys" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(15) NOT NULL,
	"hashed_password" varchar(255),
	"expires" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth_sessions" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"user_id" varchar(15) NOT NULL,
	"active_expires" bigint NOT NULL,
	"idle_expires" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_profiles" (
	"user_id" varchar PRIMARY KEY NOT NULL,
	"signature" text,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth_users" (
	"id" varchar(15) PRIMARY KEY NOT NULL,
	"role" text DEFAULT 'user',
	"username" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "conversation_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"conversation_id" serial NOT NULL,
	"content" text NOT NULL,
	"sent_at" timestamp DEFAULT now() NOT NULL,
	"read_at" timestamp,
	"sender_username" varchar NOT NULL,
	"recipient_username" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "conversations" (
	"id" serial PRIMARY KEY NOT NULL,
	"started_by_user_id" varchar NOT NULL,
	"talking_to_user_id" varchar NOT NULL,
	"started_by_username" varchar NOT NULL,
	"talking_to_username" varchar NOT NULL,
	"latest_activity" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "friends" (
	"id" serial PRIMARY KEY NOT NULL,
	"sender_username" varchar NOT NULL,
	"recipient_username" varchar NOT NULL,
	"sent_at" date DEFAULT now() NOT NULL,
	"replied_at" date,
	"request_status" "requestStatus" DEFAULT 'PENDING' NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "game_invites" ADD CONSTRAINT "game_invites_user_id_auth_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "game_invites" ADD CONSTRAINT "game_invites_game_id_events_id_fk" FOREIGN KEY ("game_id") REFERENCES "events"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_favorite_games" ADD CONSTRAINT "user_favorite_games_user_id_auth_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_favorite_games" ADD CONSTRAINT "user_favorite_games_game_id_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_game_collection" ADD CONSTRAINT "user_game_collection_user_id_auth_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_game_collection" ADD CONSTRAINT "user_game_collection_game_id_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth_keys" ADD CONSTRAINT "auth_keys_user_id_auth_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth_sessions" ADD CONSTRAINT "auth_sessions_user_id_auth_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_user_id_auth_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
