import { BggImportFail } from "$lib/data/strings/ErrorMessages";
import { successfulResponse, type ApiResponse, failedResponse } from "$lib/data/types/ApiResponse";
import { addGamesToUserCollection } from "$lib/db/queries/games/addGamesToUserCollection";
import { getGamesByBggIds } from "$lib/db/queries/games/getGamesByBggIds";
import { insertGames } from "$lib/db/queries/games/insertGames";
import { importGames } from "./complementSearch";
import { mapToDbModel, type BggGame } from "./dto/BggGame";

type BggGameImportResult = {
    numberOfGamesImported: number;
    status: "success" | "error" | "info" | "warning";
    message: string;
};

export default async function importBggCollection({ username, userId }: { username: string, userId: string }): Promise<ApiResponse<BggGameImportResult>> {
    try {
        // fetch all games for user using BGG Json API
        const response = await fetch(`https://bgg-json.azurewebsites.net/collection/${username}`);
        const data = await response.json() as BggGame[];

        const gamesToImport = data.filter(x => !x.isExpansion); // for now don't import expansions (worry about that later)


        // store number of games found for user
        const numberOfGamesImported = gamesToImport.length;

        if (numberOfGamesImported == 0) {
            // if no games are found, we don't need to do anything more
            return successfulResponse({
                numberOfGamesImported,
                status: "info",
                message: `No games found for user '${username}'`
            });
        }

        // extract all ids from the games received from user collection
        const ids = gamesToImport.map(x => x.gameId);
        // check DB for any existing games, no point in creating models from already known games
        const existingIds = (await getGamesByBggIds({ gameIds: ids })).result!;
        // extract any ID's that we do not already have in DB
        const newIds = ids.filter(id => !existingIds.includes(id));
        // import games using these ID's
        const bggGames = await importGames({ pageNo: 1, limit: 1000, ids: newIds });

        // map DTO to Database Model and add to DB
        const models = bggGames.games.map(mapToDbModel);
        await insertGames({ models });

        // we then use the BGG ID's to retrieve the ID's of all games
        // we want added to the collection
        const gameIds = await getGamesByBggIds({ gameIds: gamesToImport.map(x => x.gameId) });
        const mappedIds = gameIds.result?.map((gameId) => ({ userId: userId, gameId }));

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