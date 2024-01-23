import { DataRetrievalFail } from "$lib/data/strings/ErrorMessages";
import { successfulResponse, type ApiResponse, failedResponse } from "$lib/data/types/ApiResponse";
import { db } from "$lib/db/client";
import { games, usersToGameCollections } from "$lib/db/schema/games";
import { mapToDbModel } from "$lib/server/integrations/dto/BggGame";
import retrieveGameData from "$lib/server/integrations/retrieveGameData";
import { and, eq } from "drizzle-orm";
import { updateGame } from "./updateGame";

type Game = typeof games.$inferSelect

export async function isGameInCollection({ gameId, userId }: { gameId: number, userId: string }): Promise<ApiResponse<boolean>> {
    try {
        const response = await db.select().from(usersToGameCollections).where(
            and(
                eq(usersToGameCollections.gameId, gameId),
                eq(usersToGameCollections.userId, userId),
            )
        );


        return successfulResponse(response.length !== 0);
    } catch (err) {
        return failedResponse(DataRetrievalFail);
    }
}