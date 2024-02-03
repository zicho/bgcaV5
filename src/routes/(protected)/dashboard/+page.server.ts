import { addUsers } from '$lib/db/queries/testing/addUsers';
import { getLatestUsers } from '$lib/db/queries/users/getLatestUsers';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const response = await getLatestUsers();

    if(response.result!.length < 10) {
        await addUsers();
    }

    return {
        latestUsers: response.result!
    };
}) satisfies PageServerLoad;