import { getGamesPaginated } from '$lib/db/queries/games/getGamesPaginated';
import { addGames } from '$lib/db/queries/testing/addGames';
import { deleteAllGames } from '$lib/db/queries/testing/deleteAllGames';
import type { games } from '$lib/db/schema/games';
import { describe, it, expect } from 'vitest';

type Game = Omit<typeof games.$inferSelect, 'id' | 'desc' | 'bggId' | 'averageRating' | 'thumbnailUrl' | 'yearPublished' | 'minNumberOfPlayers' | 'maxNumberOfPlayers' | 'imageUrl'>;

function getRandomTitlePartFromGame(games: Game[]) {
    // Pick a random object from the array
    const randomObject = games[Math.floor(Math.random() * games.length)];

    // Split the name into an array of words
    const wordsArray = randomObject.name.split(' ');

    // Pick a random word from the array
    const randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];

    return randomWord;
}

describe('get_games_query', () => {
    it('default_limit_should_be_10', async () => {

        await deleteAllGames();
        await addGames(); // adds a 100 games

        const defaultSearch = await getGamesPaginated();
        expect(defaultSearch.result?.length).toBe(10);
    });

    it('filter_by_title', async () => {

        await deleteAllGames();
        const games = await addGames(); // adds a 100 games

        const searchParam = getRandomTitlePartFromGame(games as Game[]);

        const filter = await getGamesPaginated({ searchParam });

        filter.result?.forEach((game) => {
            expect(game.name).toContain(searchParam);
        });
    });


    it('filter_by_title_case_insensitive', async () => {

        await deleteAllGames();
        const games = await addGames(); // adds a 100 games

        const searchParam = getRandomTitlePartFromGame(games as Game[]).toLocaleLowerCase();

        const filteredByName = await getGamesPaginated({ searchParam });

        filteredByName.result?.forEach((game) => {
            expect(game.name.toLocaleLowerCase()).toContain(searchParam);
        });
    });

    it('pagination', async () => {

        await deleteAllGames();
        const games = await addGames(); // adds a 100 games

        const offset = 10;
        const limit = 10;

        // we need to sort by name first since query does that
        const sortedGames = games.sort((a, b) => a.name.localeCompare(b.name));
        const simulatedPage2 = sortedGames.slice(offset, offset + limit);

        const paginated = await getGamesPaginated({ pageNo: 2 });

        simulatedPage2.forEach((simulatedGame, index) => {
            const paginatedGame = paginated.result && paginated.result[index];
            expect(paginatedGame?.name.toLocaleLowerCase()).toContain(simulatedGame.name.toLocaleLowerCase());
        });
    });
});
