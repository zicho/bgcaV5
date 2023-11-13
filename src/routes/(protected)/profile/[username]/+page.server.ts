import type { PageServerLoad } from './$types';

export const load = (async ({ parent, params }) => {

	const username = (await parent()).user.username;
	const isProfileYours = username === params.username;

    return {
        isProfileYours
    };
}) satisfies PageServerLoad;