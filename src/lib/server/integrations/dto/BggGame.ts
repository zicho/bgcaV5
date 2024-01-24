import type { games } from "$lib/db/schema/games";
import { createSlug } from "$lib/utils/createSlug";

export type BggGame = {
	gameId: number;
	name: string;
	image: string;
	thumbnail: string;
	minPlayers: number;
	maxPlayers: number;
	playingTime: number;
	isExpansion: boolean;
	yearPublished: number;
	averageRating: string;
	description: string;
}

export function mapToDbModel(dto: BggGame) {
	type Game = typeof games.$inferInsert

	return {
		...dto,
		slug: createSlug(dto.name),
		gameId: dto.gameId,
		minPlayers: dto.minPlayers,
		maxPlayers: dto.maxPlayers,
		averageRating: dto.averageRating,
		thumbnail: dto.thumbnail,
		image: dto.image,
		description: dto.description,
	} satisfies Game;
}