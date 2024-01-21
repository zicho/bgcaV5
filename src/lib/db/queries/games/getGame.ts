import { DataRetrievalFail } from "$lib/data/strings/ErrorMessages";
import { successfulResponse, type ApiResponse, failedResponse } from "$lib/data/types/ApiResponse";
import { db } from "$lib/db/client";
import { games } from "$lib/db/schema/games";
import { mapToDbModel } from "$lib/server/integrations/dto/BggGame";
import retrieveGameData from "$lib/server/integrations/retrieveGameData";
import { eq } from "drizzle-orm";
import { updateGame } from "./updateGame";

type Game = typeof games.$inferSelect

export async function getGame({ id, bggId }: { id?: number, bggId?: number }): Promise<ApiResponse<Game>> {

    if (!id && !bggId) {
        return failedResponse("Supply at least one ID");
    }

    let result;

    try {
        if (id) {
            result = await db.select().from(games).where(eq(games.id, id));
        } else {
            result = await db.select().from(games).where(eq(games.bggId, bggId!));
        }

        let game = result[0];

        if (!game) {
            return failedResponse(DataRetrievalFail);
        }

        if (game.desc) { // if game has been updated with additional data, return it as is
            return successfulResponse(game);
        }

        // else we retrieve the additional data from BGG Api and update DB
        const updatedData = await retrieveGameData({ bggId: game.bggId! });
        const updatedId = (await updateGame({ id: game.id, model: mapToDbModel(updatedData.result!) })).result;

        result = await db.select().from(games).where(eq(games.id, updatedId!));
        return successfulResponse(result[0]);
    } catch {
        return failedResponse(DataRetrievalFail);
    }
}