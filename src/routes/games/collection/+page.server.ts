
import { getGames } from '$lib/db/queries/games/getGames';
import { getTotalGameCount } from '$lib/db/queries/games/getTotalGameCount';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { getTableParams, handleTableRedirect } from '$lib/components/utils/table/TableHelper';
import type TableProps from '$lib/components/props/components/TableProps';
import { getGameCollection } from '$lib/db/queries/games/getGameCollection';

export const load = (async ({ url, parent }) => {
    const { pageNo, limit, searchParam } = getTableParams(url);
    const { userId } = (await parent()).user;
    
    const totalHits = (await getTotalGameCount({ searchParam, userId })).result as number;
    const totalPages = Math.ceil(totalHits / limit);

    // handles redirects on invalid parameter states
    handleTableRedirect({
        searchParam,
        pageNo,
        limit,
        totalPages,
        fallbackUrl: url
    })

    const response = await getGameCollection({ userId, pageNo, limit, searchParam });

    if (response.error) {
        throw error(520);
    }

    return {
        games: response.result!,
        searchParam,
        pageNo,
        limit,
        totalHits,
        totalPages,
        resultsEmpty: totalHits == 0
    };
}) satisfies PageServerLoad;