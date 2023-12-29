import { DataRetrievalFail } from "$lib/data/strings/ErrorMessages";
import { successfulResponse, type ApiResponse, failedResponse } from "$lib/data/types/ApiResponse";
import { db } from "$lib/db/client";
import { games } from "$lib/db/schema/games";
import { eq } from "drizzle-orm";

type Game = typeof games.$inferSelect

export async function getGame(id: number): Promise<ApiResponse<Game>> {
    try {
        const result = await db.select().from(games).where(
            eq(games.id, id)
        );

        return successfulResponse(result[0]);
    } catch {
        return failedResponse(DataRetrievalFail);
    }
}