import { getUserProfile } from '$lib/db/queries/profile/getUserProfile';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ parent, params }) => {

    const username = (await parent()).user.username;
    const isProfileYours = username === params.username;

    const profile = await getUserProfile({ username });

    if (profile.success) {
        return {
            isProfileYours,
            profile: profile.result
        };
    } else {
        throw error(500, profile.message);
    }


}) satisfies PageServerLoad;