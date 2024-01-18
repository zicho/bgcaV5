import type { games } from "$lib/db/schema/games";
import { createSlug } from "$lib/utils/createSlug";

export type BggGameSimple = {
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
}

export function mapToDbModel(dto: BggGameSimple) {

	type Game = typeof games.$inferInsert

	return {
		...dto,
		slug: createSlug(dto.name),
		bggId: dto.gameId,
		minNumberOfPlayers: dto.minPlayers,
		maxNumberOfPlayers: dto.maxPlayers,
		averageRating: dto.averageRating,
		thumbnailUrl: dto.thumbnail,
		imageUrl: dto.image
	} as Game;
}