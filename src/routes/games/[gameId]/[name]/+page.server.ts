import { getGame } from '$lib/db/queries/games/getGame';
import { isGameInCollection } from '$lib/db/queries/games/isGameInCollection';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, parent }) => {
    const response = await getGame({ gameId: Number(params.gameId) });
    const game = response.result;
    const { userId } = (await parent()).user;

    const inYourCollection = (await isGameInCollection({ gameId: game?.gameId!, userId })).result;

    return {
        game,
        inYourCollection
    };

}) satisfies PageServerLoad;