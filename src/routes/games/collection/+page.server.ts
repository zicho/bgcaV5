
import { getCollectionGameCount } from '$lib/db/queries/games/getTotalGameCount';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { getGameCollection } from '$lib/db/queries/games/getGameCollection';
import { getTableParams, handleTableRedirect } from '$lib/components/utils/table/TableHelper';

export const load = (async ({ url, parent }) => {
    const { pageNo, limit, searchParam } = getTableParams(url);
    const { userId } = (await parent()).user;
    
    const totalHits = (await getCollectionGameCount({ userId })).result as number;
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
    const gamesInCollectionCount = (await getCollectionGameCount({ userId })).result as number;

    if (!response.success) {
        throw error(520);
    }

    return {
        games: response.result!,
        gamesInCollectionCount,
        searchParam,
        pageNo,
        limit,
        totalHits,
        totalPages,
        resultsEmpty: totalHits == 0
    };
}) satisfies PageServerLoad;