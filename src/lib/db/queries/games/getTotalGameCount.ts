import { DataRetrievalFail } from "$lib/data/strings/ErrorMessages";
import { successfulResponse, type ApiResponse, failedResponse } from "$lib/data/types/ApiResponse";
import { db } from "$lib/db/client";
import { games, usersToGameCollections } from "$lib/db/schema/games";
import { and, eq, ilike, sql } from "drizzle-orm";

export async function getTotalGameCount({ searchParam = "", userId = "" }: { searchParam?: string; userId?: string } = {}): Promise<ApiResponse<number>> {
    try {
        // todo: conditional query instead of two separate, somehow?
        if (userId) {
            const totalHits = (
                await db
                    .select({ count: sql<number>`count(*)` })
                    .from(usersToGameCollections)
                    .where(and(eq(usersToGameCollections.userId, userId), ilike(games.name, `%${searchParam}%`)))
                    .leftJoin(games, eq(usersToGameCollections.gameId, games.id))
            )[0].count;

            return successfulResponse(totalHits);
        }

        const totalHits = (
            await db
                .select({ count: sql<number>`count(*)` })
                .from(games)
                .where(and(ilike(games.name, `%${searchParam}%`)))
        )[0].count;

        return successfulResponse(totalHits);
    }
    catch {
        return failedResponse(DataRetrievalFail);
    }
}