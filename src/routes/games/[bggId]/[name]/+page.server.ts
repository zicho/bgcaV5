import { getGame } from '$lib/db/queries/games/getGame';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { isGameInCollection } from '$lib/db/queries/games/isGameInCollection';

export const load = (async ({ params, parent }) => {
    try {
        const response = await getGame({ bggId: Number(params.bggId) });

        if (!response.success) {
            throw error(404);
        }

        const game = response.result;
        const { userId } = (await parent()).user;

        const inYourCollection = (await isGameInCollection({ id: game?.id!, userId })).result;

        return {
            game,
            inYourCollection
        };
    } catch (err) {
        throw error(520);
    }
}) satisfies PageServerLoad;