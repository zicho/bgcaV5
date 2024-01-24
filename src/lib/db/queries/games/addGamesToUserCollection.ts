import { successfulResponse, type ApiResponse, failedResponse } from "$lib/data/types/ApiResponse";
import { db } from "$lib/db/client";
import { usersToGameCollections } from "$lib/db/schema/games";

export async function addGamesToUserCollection
    (mappedIds: { userId: string; gameId: number; }[]): Promise<ApiResponse<number[]>> {

    try {
        const insertedGames = await db
            .insert(usersToGameCollections)
            .values(mappedIds)
            .onConflictDoNothing()
            .returning({ insertedId: usersToGameCollections.gameId });

        return successfulResponse(insertedGames.map(x => x.insertedId!));
    } catch (err) {
        return failedResponse("Failed to insert data");
    }
}