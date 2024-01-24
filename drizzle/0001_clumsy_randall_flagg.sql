ALTER TABLE "games" RENAME COLUMN "playingTime" TO "minPlayingTime";--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "maxPlayingTime" smallint;