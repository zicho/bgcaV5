import * as xml2js from "xml2js";
import type { BggGame } from "./dto/BggGame";

// if a user searches for a game which we don't have, we use the BGG XML API to retrieve it/them if they exist.
export async function getIds(query: string): Promise<number[]> {
    try {
        if(!query) {
            return [];
        }
        // Fetch XML data
        const baseURL = `https://boardgamegeek.com/xmlapi2/search`;

        const params = new URLSearchParams({
            query,
            type: 'boardgame'
        });

        const url = `${baseURL}?${params.toString()}`;

        const response = await fetch(url);
        // Extract XML text from the response
        const xmlText = await response.text();
        const ids = await parseIdsFromXml(xmlText);

        return ids.slice(0, 100);
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

function paginateArray(inputArray: BggGame[], page: number, limit: number): BggGame[] {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return inputArray.slice(startIndex, endIndex);
}

type BggSearchResult = {
    games: BggGame[],
    totalHits: number
};

export async function importGames({ ids, limit, pageNo }: { ids: number[], limit: number, pageNo: number }): Promise<BggSearchResult> {
    try {

        if(ids.length === 0) {
            return {
                games: [],
                totalHits: 0
            };
        }

        const baseURL = 'https://boardgamegeek.com/xmlapi2/thing';

        const games: BggGame[] = [];

        const params = new URLSearchParams({
            type: 'boardgame',
            stats: '1',
            id: ids.join(',')
        });

        const url = `${baseURL}?${params.toString()}`;
        const response = await fetch(url);
        // Extract XML text from the response
        const xmlText = await response.text();
        games.push(...await parseGamesFromXml(xmlText));

        const gameCount = games.filter(x => x);
        const paginatedGames = paginateArray(gameCount, pageNo, limit);

        return {
            games: paginatedGames,
            totalHits: gameCount.length
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            games: [],
            totalHits: 0
        };
    }
}

async function parseIdsFromXml(xmlText: string): Promise<number[]> {
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

async function parseGamesFromXml(xmlText: string): Promise<BggGame[]> {
    return new Promise((resolve, reject) => {
        xml2js.parseString(xmlText, { explicitArray: false, mergeAttrs: true }, (err, result) => {
            if (err) {
                reject(err);
            } else {
                // Now 'items' is always an array, whether it was originally an array or an object
                const items = Array.isArray(result.items.item) ? result.items.item : [result.items.item];
                const games: BggGame[] = items.map((item: any) => parseGame(item));
                resolve(games);
            }
        });
    });
};

function parseGame(item: any): BggGame | null {

    let primaryName = "";
    if (Array.isArray(item.name)) {
        // If 'name' is an array, find the primary name
        const primaryNameObj = item.name.find((n: { type: string; }) => n.type === 'primary');
        if (primaryNameObj) {
            primaryName = primaryNameObj.value;
        }
    } else if (typeof item.name === 'object') {
        // If 'name' is an object, assume it is the primary name
        primaryName = item.name.value;
    }

    const v = item.statistics.ratings.average.value;

    if (item.type === "boardgame") {
        const game = {
            gameId: parseInt(item.id),
            name: primaryName,
            image: item.image,
            thumbnail: item.thumbnail,
            minPlayers: parseInt(item.minplayers.value),
            maxPlayers: parseInt(item.maxplayers.value),
            playingTime: parseInt(item.playingtime.value),
            isExpansion: false, // Assuming this information is not present in the provided JSON
            yearPublished: parseInt(item.yearpublished.value),
            averageRating: v, // Assuming this information is not present in the provided JSON
            description: item.description.replace(/&#10;/g, '\n'), // Replacing HTML line breaks with actual line breaks
        } satisfies BggGame;

        return game;
    }

    return null;
}