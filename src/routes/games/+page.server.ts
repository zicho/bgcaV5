import { getTableParams } from '$lib/components/utils/table/getTableParams';
import { getGames } from '$lib/db/queries/games/getGames';
import { getTotalGameCount } from '$lib/db/queries/games/getTotalGameCount';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ url }) => {
    const { pageNo, limit, searchParam } = getTableParams(url);
	const totalHits = (await getTotalGameCount({ searchParam })).result as number;

    const totalPages = Math.ceil(totalHits / limit);

    if ((pageNo > totalPages || pageNo < 1) && !searchParam && totalPages != 0) {
		// totalpages != 0 is needed to not crash when getting empty results, should get a nicer fix
		throw redirect(302, `/games`);
	}

    const games = await getGames({ pageNo, limit, searchParam });

    return {
        games,
        searchParam,
		pageNo,
		limit,
		totalHits,
		totalPages
    };
}) satisfies PageServerLoad;