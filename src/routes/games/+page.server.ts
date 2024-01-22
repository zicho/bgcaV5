

import { getTotalGameCount } from '$lib/db/queries/games/getTotalGameCount';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getTableParams, handleTableRedirect } from '$lib/components/utils/table/TableHelper';
import { getGamesPaginated } from '$lib/db/queries/games/getGamesPaginated';
import { complementSearch } from '$lib/server/integrations/complementSearch';

export const load = (async ({ url }) => {
    const { pageNo, limit, searchParam } = getTableParams(url);

    let totalHits = (await getTotalGameCount({ searchParam })).result as number;
    let totalPages = Math.ceil(totalHits / limit);

    // handles redirects on invalid parameter states
    handleTableRedirect({
        searchParam,
        pageNo,
        limit,
        totalPages,
        fallbackUrl: url
    })

    if (totalHits == 0 && searchParam) {
        try {
            await complementSearch(searchParam);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const response = await getGamesPaginated({ pageNo, limit, searchParam });

    if (!response.success) {
        throw error(520);
    }

    totalHits = (await getTotalGameCount({ searchParam })).result as number;
    totalPages = Math.ceil(totalHits / limit);

    return {
        games: response.result!,
        searchParam,
        pageNo,
        limit,
        totalHits,
        totalPages,
        resultsEmpty: response.result?.length == 0
    };
}) satisfies PageServerLoad;

