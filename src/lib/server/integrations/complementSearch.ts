import * as xml2js from "xml2js";
import retrieveGameData from "./retrieveGameData";
import { mapToDbModel } from "./dto/BggGame";
import type { games } from "$lib/db/schema/games";
import { insertGames } from "$lib/db/queries/games/insertGames";

// if a user searches for a game which we don't have, we use the BGG XML API to retrieve it/them if they exist.
export async function complementSearch(query: string): Promise<void> {
    try {
        // Fetch XML data
        const response = await fetch(`https://boardgamegeek.com/xmlapi2/search?query=${query}&type=boardgame&exact=1`);

        if (!response.ok) {
            // TODO: log
            return;
        }

        // Extract XML text from the response
        const xmlText = await response.text();
        const ids = await parseXml(xmlText);

        const models: typeof games.$inferInsert[] = [];

        for (const id of ids) {
            const gameData = (await retrieveGameData({ bggId: id })).result;
            if (gameData && !gameData?.isExpansion) {
                models.push(mapToDbModel(gameData));
            }
        }

        await insertGames({ models });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function parseXml(xmlText: string): Promise<number[]> {
    return new Promise((resolve, reject) => {
        xml2js.parseString(xmlText, (err: any, result: any) => {
            if (err) {
                reject(err);
            } else {
                try {
                    const games: number[] = result.items.item.map((item: any) => (parseInt(item.$.id, 10)));
                    resolve(games);
                } catch (error) {
                    reject(error);
                }
            }
        });
    });
}