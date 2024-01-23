import { getGame } from '$lib/db/queries/games/getGame';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { isGameInCollection } from '$lib/db/queries/games/isGameInCollection';
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