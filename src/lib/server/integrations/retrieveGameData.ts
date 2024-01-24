import { DataRetrievalFail } from "$lib/data/strings/ErrorMessages";
import { successfulResponse, type ApiResponse, failedResponse } from "$lib/data/types/ApiResponse";
import { importGames } from "./complementSearch";
import type { BggGame } from "./dto/BggGame";

export default async function retrieveGameData({ gameId }: { gameId: number }): Promise<ApiResponse<BggGame>> {
    try {
        const response = await fetch(`https://bgg-json.azurewebsites.net/thing/${gameId}`);
        // const data = await response.json() as BggGame;
        const data = importGames({ ids: [gameId], limit: 1000, pageNo: 1 })

        return successfulResponse((await data).games[0]);
    } catch (error) {
        return failedResponse(DataRetrievalFail);
    }
}
