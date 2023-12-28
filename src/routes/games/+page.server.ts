import { getTableParams } from '$lib/components/utils/table/getTableParams';
import { getTotalGameCount } from '$lib/db/queries/games/getTotalGameCount';
import type { PageServerLoad } from './$types';

export const load = (async ({ parent, url }) => {

	const userId = (await parent()).user.userId;

    const { searchParam } = getTableParams(url);

	const totalHits = await getTotalGameCount({ userId, searchParam });

    return {};
}) satisfies PageServerLoad;