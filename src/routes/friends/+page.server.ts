import { FriendListViewModelMapper } from '$lib/data/viewmodels/FriendListViewModel';
import { getUserFriends } from '$lib/db/queries/users/getUserFriends';
import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {

    const { username } = (await parent()).user;
    const friends = (await getUserFriends({ username })).result

    const viewModels = friends?.map(f => FriendListViewModelMapper.map(f, username))!
    
    console.dir(viewModels[0]);

    return {
        friends: viewModels!
    };
}) satisfies PageServerLoad;