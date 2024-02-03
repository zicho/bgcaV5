import { getUserProfile } from '$lib/db/queries/profile/getUserProfile';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getFriendship } from '$lib/db/queries/relationships/getFriendshipStatus';
import { FriendshipStatusViewModelMapper } from '$lib/data/viewmodels/FriendshipStatusViewModel';

export const load = (async ({ parent, params }) => {

    const username = (await parent()).user.username;
    const isProfileYours = username === params.username;

    const profile = await getUserProfile({ username });

    const friendshipStatus = (await getFriendship({ senderUsername: username, recipientUsername: params.username })).result!;

    const viewModel = FriendshipStatusViewModelMapper.map(friendshipStatus, username);

    if (profile.success) {
        return {
            isProfileYours,
            profile: profile.result,
            friendshipStatus: viewModel
        };
    } else {
        error(500, profile.message);
    }


}) satisfies PageServerLoad;