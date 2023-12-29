import { games } from '$lib/db/schema/games';
import generateTestGame from 'tests/test_utils/generateTestGame';
import { db } from '../../client';

type Game = typeof games.$inferInsert;

export async function addGames(noOfGames: number = 100): Promise<Game[]> {
    const generatedGames: Game[] = [];

    for (let i = 0; i < noOfGames; i++) {
        generatedGames.push(generateTestGame())
    }

    await db.insert(games).values(generatedGames);

    return generatedGames;
}