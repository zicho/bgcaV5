import { getUserProfile } from '$lib/db/queries/profile/getUserProfile';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ parent, params }) => {

    const username = (await parent()).user.username;
    const isProfileYours = username === params.username;

    const profile = await getUserProfile({ username });

    if (profile.error) {
        throw error(500, profile.message);
    }

    return {
        isProfileYours,
        profile: profile.result
    };
}) satisfies PageServerLoad;