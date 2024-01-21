import { mapToDbModel, type BggGame } from '$lib/server/integrations/dto/BggGameSimple';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import mockedGames from './test_data/mockedGames';
import importBggCollection from '$lib/server/integrations/importBggCollection';
import { getGamesPaginated } from '$lib/db/queries/games/getGames';
import { deleteAllGames } from '$lib/db/queries/testing/deleteAllGames';
import generateTestUsername from 'tests/test_utils/generateTestUsername';
import registerUserAndReturnSession from '$lib/db/queries/authentication/registerUserAndReturnSession';
import { getGameCollection } from '$lib/db/queries/games/getGameCollection';
import { insertGames } from '$lib/db/queries/games/insertGames';
import { addGamesToUserCollection } from '$lib/db/queries/games/addGamesToUserCollection';

function createFetchResponse<T>(data: T) {
    return { json: () => new Promise((resolve) => resolve(data)) }
}

describe('get_games_query', () => {
    beforeEach(async () => {
        await deleteAllGames();
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it("should_add_to_games_table_and_user_collection", async () => {
        const username = generateTestUsername();
        const user = await registerUserAndReturnSession({ username, password: "password" });

        global.fetch = vi.fn().mockResolvedValue(createFetchResponse([...mockedGames]))

        const userId = user.result?.user.userId!;

        const numberOfGamesInitial = (await getGamesPaginated()).result?.length;
        const numberOfGamesInCollectionInitial = (await getGameCollection({ userId })).result?.length;

        expect(numberOfGamesInitial).toBe(0);
        expect(numberOfGamesInCollectionInitial).toBe(0);

        await importBggCollection({ username, userId });

        const numberOfGames = (await getGamesPaginated()).result?.length;
        const expectedNumberOfGames = mockedGames.length;
        expect(numberOfGames).toBe(expectedNumberOfGames);
        
        const numberOfGamesInCollection = (await getGameCollection({ userId })).result?.length;
        const expectedNumberOfGamesInCollection = mockedGames.length;
        expect(numberOfGamesInCollection).toBe(expectedNumberOfGamesInCollection);
    });

    it("should_not_add_games_to_games_table_if_all_are_present_in_games_table", async () => {
        const models = [...mockedGames].map(mapToDbModel);

        const insertedGamesCount = (await insertGames({ models })).result?.length;
        const expectedInsertedGamesCount = mockedGames.length;
        expect(insertedGamesCount).toBe(expectedInsertedGamesCount);

        const username = generateTestUsername();
        const user = await registerUserAndReturnSession({ username, password: "password" });

        global.fetch = vi.fn().mockResolvedValue(createFetchResponse([...mockedGames]))

        const userId = user.result?.user.userId!;
        await importBggCollection({ username, userId });

        const numberOfGames = (await getGamesPaginated()).result?.length;
        const expectedNumberOfGames = mockedGames.length;
        expect(numberOfGames).toBe(expectedNumberOfGames);
    });

    it("should_only_add_games_to_games_table_if_not_already_in_games_table", async () => {
        const getTwoFirstGames = [...mockedGames.slice(0, 2)];

        const models = [...getTwoFirstGames].map(mapToDbModel);

        const insertedGamesCount = (await insertGames({ models })).result?.length;
        const expectedInsertedGamesCount = getTwoFirstGames.length;
        expect(insertedGamesCount).toBe(expectedInsertedGamesCount);

        const username = generateTestUsername();
        const user = await registerUserAndReturnSession({ username, password: "password" });

        global.fetch = vi.fn().mockResolvedValue(createFetchResponse([...mockedGames]))

        const userId = user.result?.user.userId!;
        await importBggCollection({ username, userId });

        const numberOfGames = (await getGamesPaginated()).result?.length;
        const expectedNumberOfGames = mockedGames.length;
        expect(numberOfGames).toBe(expectedNumberOfGames);
    });

    it("should_add_all_games_not_in_user_collection_to_collection", async () => {
        const models = [...mockedGames].map(mapToDbModel);

        const insertedGamesCount = (await insertGames({ models })).result?.length;
        const expectedInsertedGamesCount = mockedGames.length;
        expect(insertedGamesCount).toBe(expectedInsertedGamesCount);

        const username = generateTestUsername();
        const user = await registerUserAndReturnSession({ username, password: "password" });

        global.fetch = vi.fn().mockResolvedValue(createFetchResponse([...mockedGames]))

        const userId = user.result?.user.userId!;

        const numberOfGamesInCollectionInitial = (await getGameCollection({ userId })).result?.length;
        expect(numberOfGamesInCollectionInitial).toBe(0);

        await importBggCollection({ username, userId });

        const numberOfGamesInCollection = (await getGameCollection({ userId })).result?.length;
        const expectedNumberOfGamesInCollection = mockedGames.length;
        expect(numberOfGamesInCollection).toBe(expectedNumberOfGamesInCollection);
    });

    it("should_not_re_add_games_in_user_collection_to_collection", async () => {
        const models = [...mockedGames].map(mapToDbModel);

        const insertedGameIds = (await insertGames({ models })).result!;

        const username = generateTestUsername();
        const user = await registerUserAndReturnSession({ username, password: "password" });
        const userId = user.result?.user.userId!;

        const mappedIds = [...insertedGameIds].map((id) => ({ userId, gameId: id }));
        await addGamesToUserCollection(mappedIds);

        global.fetch = vi.fn().mockResolvedValue(createFetchResponse([...mockedGames]));

        const numberOfGamesInCollectionInitial = (await getGameCollection({ userId })).result?.length;
        expect(numberOfGamesInCollectionInitial).toBe(insertedGameIds.length);

        await importBggCollection({ username, userId });

        const numberOfGamesInCollection = (await getGameCollection({ userId })).result?.length;
        const expectedNumberOfGamesInCollection = mockedGames.length;
        expect(numberOfGamesInCollection).toBe(expectedNumberOfGamesInCollection);
    });
});
