import { DataRetrievalFail } from "$lib/data/strings/ErrorMessages";
import { successfulResponse, type ApiResponse, failedResponse } from "$lib/data/types/ApiResponse";
import { db } from "$lib/db/client";
import { games } from "$lib/db/schema/games";

type Game = typeof games.$inferInsert

export async function insertGames({ models }: { models: Game[] }): Promise<ApiResponse<number[]>> {
    try {
        const insertedGames = await db
            .insert(games)
            .values(models)
            .onConflictDoNothing({ target: games.gameId })
            .returning({
                id: games.gameId,
            });

        return successfulResponse(insertedGames.map(x => x.id));
    } catch(err) {
        return failedResponse(DataRetrievalFail);
    }
}