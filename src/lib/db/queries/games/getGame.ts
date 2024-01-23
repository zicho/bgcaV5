import { DataRetrievalFail } from "$lib/data/strings/ErrorMessages";
import { successfulResponse, type ApiResponse, failedResponse } from "$lib/data/types/ApiResponse";
import { db } from "$lib/db/client";
import { games } from "$lib/db/schema/games";
import { mapToDbModel } from "$lib/server/integrations/dto/BggGame";
import retrieveGameData from "$lib/server/integrations/retrieveGameData";
import { eq } from "drizzle-orm";
import { updateGame } from "./updateGame";
import { insertGames } from "./insertGames";

type Game = typeof games.$inferSelect

async function getGameById(id: number): Promise<Game | undefined> {
  const result = await db.select().from(games).where(eq(games.id, id));
  return result[0];
}

async function getGameByBggId(bggId: number): Promise<Game | undefined> {
  const result = await db.select().from(games).where(eq(games.bggId, bggId));
  return result[0];
}

export async function getGame({ id, bggId }: { id?: number, bggId?: number }): Promise<ApiResponse<Game>> {
  if (!id && !bggId) {
    return failedResponse("Supply at least one ID");
  }

  try {
    let game;

    if (id) {
      game = await getGameById(id);
    } else {
      game = await getGameByBggId(bggId!);
    }

    if (!game && bggId) {
      const updatedData = await retrieveGameData({ bggId: bggId! });
      const newData = mapToDbModel(updatedData.result!);
      const insertedId = (await insertGames({ models: [newData] })).result![0];
      game = await getGameById(insertedId);
    }

    return game ? successfulResponse(game) : failedResponse("Game not found");
  } catch {
    return failedResponse(DataRetrievalFail);
  }
}
