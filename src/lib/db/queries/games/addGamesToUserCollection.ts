import { successfulResponse, type ApiResponse } from "$lib/data/types/ApiResponse";
import { db } from "$lib/db/client";
import { usersToGameCollections } from "$lib/db/schema/games";

export async function addGamesToUserCollection
    (mappedIds: { userId: string; gameId: number; }[]): Promise<ApiResponse<number[]>> {

    const insertedGames = await db
        .insert(usersToGameCollections)
        .values(mappedIds)
        .onConflictDoNothing()
        .returning({ insertedId: usersToGameCollections.gameId });

    return successfulResponse(insertedGames.map(x => x.insertedId));
}