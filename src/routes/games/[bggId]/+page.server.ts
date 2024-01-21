import { getGame } from '$lib/db/queries/games/getGame';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    try {
        const response = await getGame({ bggId: Number(params.bggId) });

        if (!response.success) {
            throw error(404);
        }

        const game = response.result;
        
        return {
            game
        };
    } catch (err) {
        throw error(520);
    }
}) satisfies PageServerLoad;