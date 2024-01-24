import { getGame } from '$lib/db/queries/games/getGame';
import { isGameInCollection } from '$lib/db/queries/games/isGameInCollection';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, parent }) => {
    const response = await getGame({ gameId: Number(params.gameId) });
    const game = response.result;

    if(!game) {
        error(404, `Game  with id '${params.gameId}' could not be found.`);
    }

    const { userId } = (await parent()).user;

    const inYourCollection = (await isGameInCollection({ gameId: game?.gameId!, userId })).result;

    return {
        game,
        inYourCollection
    };

}) satisfies PageServerLoad;