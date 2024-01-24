import { DataRetrievalFail } from "$lib/data/strings/ErrorMessages";
import { successfulResponse, type ApiResponse, failedResponse } from "$lib/data/types/ApiResponse";
import { db } from "$lib/db/client";
import { games } from "$lib/db/schema/games";
import { mapToDbModel } from "$lib/server/integrations/dto/BggGame";
import retrieveGameData from "$lib/server/integrations/retrieveGameData";
import { eq } from "drizzle-orm";
import { insertGames } from "./insertGames";
import { updateGame } from "./updateGame";

type Game = typeof games.$inferSelect

async function getGameById(gameId: number): Promise<Game> {
  const result = await db.select().from(games).where(eq(games.gameId, gameId));
  return result[0];
}

export async function getGame({ gameId }: { gameId: number }): Promise<ApiResponse<Game>> {
  try {

    let game = await getGameById(gameId);

    if (!game || !game.description) {
      const updatedData = await retrieveGameData({ gameId: gameId! });
      const newData = mapToDbModel(updatedData.result!);

      if (!game) {
        const insertedId = (await insertGames({ models: [newData] })).result![0];
        game = await getGameById(insertedId);
      } else {
        await updateGame({ id: gameId, model: newData });
        game = await getGameById(gameId);
      }
    }

    return game ? successfulResponse(game) : failedResponse("Game not found");
  } catch (err) {
    return failedResponse(DataRetrievalFail);
  }
}
