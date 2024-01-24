import type { PageServerLoad } from './$types';
import { getTableParams, handleTableRedirect } from '$lib/components/utils/table/TableHelper';
import { getGames, getIds as getIds } from '$lib/server/integrations/complementSearch';

export const load = (async ({ url }) => {
    const { pageNo, limit, searchParam } = getTableParams(url);

    const ids = await getIds(searchParam);
    const searchResult = await getGames({ ids, limit, pageNo });

    let totalHits = searchResult.totalHits;
    let totalPages = Math.ceil(totalHits / limit);

    // handles redirects on invalid parameter states
    handleTableRedirect({
        searchParam,
        pageNo,
        limit,
        totalPages,
        fallbackUrl: url
    })
   
    return {
        games: searchResult.games,
        searchParam,
        pageNo,
        limit,
        totalHits,
        totalPages,
        resultsEmpty: searchResult.games?.length == 0
    };
}) satisfies PageServerLoad;

