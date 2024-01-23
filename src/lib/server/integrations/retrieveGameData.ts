import { DataRetrievalFail } from "$lib/data/strings/ErrorMessages";
import { successfulResponse, type ApiResponse, failedResponse } from "$lib/data/types/ApiResponse";
import type { BggGame } from "./dto/BggGame";

export default async function retrieveGameData({ gameId }: { gameId: number }): Promise<ApiResponse<BggGame>> {
    try {
        const response = await fetch(`https://bgg-json.azurewebsites.net/thing/${gameId}`);
        const data = await response.json() as BggGame;

        return successfulResponse(data);
    } catch (error) {
        return failedResponse(DataRetrievalFail);
    }
}
