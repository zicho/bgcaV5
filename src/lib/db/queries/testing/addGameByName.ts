import { games } from '$lib/db/schema/games';
import generateTestGame from 'tests/test_utils/generateTestGame';
import { db } from '../../client';

type Game = typeof games.$inferInsert;

export async function addGameByName(name: string): Promise<Game> {
    const game = generateTestGame({ providedTitle: name });
    await db.insert(games).values(game);

    return game;
}