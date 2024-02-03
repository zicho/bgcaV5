import { findByUsername } from '$lib/db/queries/users/findByUsername';
import { getUser } from '$lib/server/utils/getUser';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    // todo: show user friend list?
    const response = await findByUsername({ username: params.username });

    if (!response.success) {
        error(520);
    }

    if (!response.result) {
        error(404);
    }

    redirect(302, `/profile/${response.result.username}`);
}) satisfies PageServerLoad;