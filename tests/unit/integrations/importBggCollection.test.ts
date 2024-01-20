import type { BggGameSimple } from '$lib/server/integrations/dto/BggGameSimple';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import mockedGames from './test_data/mockedGames';
import importBggCollection from '$lib/server/integrations/importBggCollection';
import { getGames } from '$lib/db/queries/games/getGames';
import { deleteAllGames } from '$lib/db/queries/testing/deleteAllGames';
import generateTestUsername from 'tests/test_utils/generateTestUsername';
import registerUserAndReturnSession from '$lib/db/queries/authentication/registerUserAndReturnSession';
import { getGameCollection } from '$lib/db/queries/games/getGameCollection';

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
        await importBggCollection({ username, userId });

        const numberOfGames = (await getGames()).result?.length;
        const expectedNumberOfGames = mockedGames.length;
        expect(numberOfGames).toBe(expectedNumberOfGames);
        
        const numberOfGamesInCollection = (await getGameCollection({ userId })).result?.length;
        const expectedNumberOfGamesInCollection = mockedGames.length;
        expect(numberOfGamesInCollection).toBe(expectedNumberOfGamesInCollection);
    });

    it("should_not_add_games_to_games_table_if_all_are_present_in_games_table", async () => {
        // todo: make this test
    });

    it("should_only_add_games_to_games_table_if_not_already_in_games_table", async () => {
        // todo: make this test
    });

    it("should_add_all_games_not_in_user_collection_to_collection", async () => {
        // todo: make this test
    });

    it("should_not_re_add_games_in_user_collection_to_collection", async () => {
        // todo: make this test
    });
});
