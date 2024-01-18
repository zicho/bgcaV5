import { DataRetrievalFail } from "$lib/data/strings/ErrorMessages";
import { successfulResponse, type ApiResponse, failedResponse } from "$lib/data/types/ApiResponse";
import { db } from "$lib/db/client";
import { games as g } from "$lib/db/schema/games";
import { inArray } from "drizzle-orm";

export async function getGamesByBggIds({ bggIds }: { bggIds: number[] }): Promise<ApiResponse<number[]>> {
    try {
        const games = await db
            .select({
                id: g.id
            })
            .from(g)
            .where(
                inArray(
                    g.bggId,
                    bggIds)
            );

        return successfulResponse(games.map(x => x.id));
    } catch {
        return failedResponse(DataRetrievalFail);
    }
}