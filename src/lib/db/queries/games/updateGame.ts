import { DataUpdateFail } from "$lib/data/strings/ErrorMessages";
import { successfulResponse, type ApiResponse, failedResponse } from "$lib/data/types/ApiResponse";
import { db } from "$lib/db/client";
import { games } from "$lib/db/schema/games";
import { eq } from "drizzle-orm";

type Game = typeof games.$inferInsert

export async function updateGame({ id, model }: { id: number, model: Game }): Promise<ApiResponse<number>> {

    try {
        const result = await db.update(games)
            .set({ desc: model.desc })
            .where(eq(games.id, id))
            .returning({ updatedId: games.id });;

        return successfulResponse(result[0].updatedId);
    } catch (err) {
        return failedResponse(DataUpdateFail);
    }
}