import { FriendListViewModelMapper } from '$lib/data/viewmodels/FriendListViewModel';
import { getUserFriends } from '$lib/db/queries/users/getUserFriends';
import { REQUEST_STATUS } from '$lib/db/schema/types';
import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {

    const { username } = (await parent()).user;
    const friends = (await getUserFriends({ username, status: REQUEST_STATUS.PENDING })).result

    const viewModels = friends?.map(f => FriendListViewModelMapper.map(f, username))!

    console.dir(viewModels[0]);

    return {
        requests: viewModels!
    };
}) satisfies PageServerLoad;