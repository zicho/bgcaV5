import { DataRetrievalFail } from "$lib/data/strings/ErrorMessages";
import { successfulResponse, type ApiResponse, failedResponse } from "$lib/data/types/ApiResponse";
import { db } from "$lib/db/client";
import { games, usersToGameCollections } from "$lib/db/schema/games";
import { and, eq, ilike, sql } from "drizzle-orm";

export async function getCollectionGameCount({ userId }: { userId: string }): Promise<ApiResponse<number>> {
    try {
        // todo: conditional query instead of two separate, somehow?
        const totalHits = (
            await db
                .select({ count: sql<number>`count(*)` })
                .from(usersToGameCollections)
                .where((eq(usersToGameCollections.userId, userId)))
                .leftJoin(games, eq(usersToGameCollections.gameId, games.gameId))
        )[0].count;

        return successfulResponse(totalHits);
    }
    catch {
        return failedResponse(DataRetrievalFail);
    }
}