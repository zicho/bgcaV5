import { BggImportFail } from "$lib/data/strings/ErrorMessages";
import { successfulResponse, type ApiResponse, failedResponse } from "$lib/data/types/ApiResponse";
import { addGamesToUserCollection } from "$lib/db/queries/games/addGamesToUserCollection";
import { getGamesByBggIds as getGameIdsByBggIds } from "$lib/db/queries/games/getGamesByBggId";
import { insertGames } from "$lib/db/queries/games/insertGames";
import { mapToDbModel, type BggGameSimple } from "./dto/BggGameSimple";

type BggGameImportResult = {
    numberOfGamesImported: number;
    status: "success" | "error" | "info" | "warning";
    message: string;
};

export default async function importBggCollection({ username, user_id }: { username: string, user_id: string }): Promise<ApiResponse<BggGameImportResult>> {
    try {
        // fetch all games for user using BGG Json API
        const response = await fetch(`https://bgg-json.azurewebsites.net/collection/${username}`);
        const data = await response.json() as BggGameSimple[];

        // store number of games found for user
        const numberOfGamesImported = data.length;

        if (numberOfGamesImported == 0) {
            // if no games are found, we don't need to do anything more
            return successfulResponse({
                numberOfGamesImported,
                status: "info",
                message: `No games found for user '${username}'`
            });
        }

        // map DTO to Database Model and add to DB
        const models = data.map(mapToDbModel);
        await insertGames({ models });

        // we then use the BGG ID's to retrieve the ID's of all games
        // we want added to the collection
        const gameIds = await getGameIdsByBggIds({ bggIds: data.map(x => x.gameId) });
		const mappedIds = gameIds.result?.map((gameId) => ({ userId: user_id, gameId }));

        await addGamesToUserCollection(mappedIds!);

        return successfulResponse({
            numberOfGamesImported,
            status: "warning",
            message: `Added '${numberOfGamesImported} games to your collection!'`
        });
    }
    catch (_) {
        return failedResponse(BggImportFail);
    }
}
