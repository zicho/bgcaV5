import { findByUsername } from '$lib/db/queries/users/findByUsername';
import { getUser } from '$lib/server/utils/getUser';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { sendFriendRequest } from '$lib/db/queries/relationships/sendFriendRequest';
import { deleteFriendship } from '$lib/db/queries/relationships/deleteFriendship';

export const load = (async ({ params, parent }) => {
    // todo: show user friend list?
    const response = await findByUsername({ username: params.username });

    if (!response.success) {
        error(520);
    }

    if (!response.result) {
        error(404);
    }

    const { username: recipientUsername } = response.result;

    const senderUsername = (await parent()).user.username;
    const friendRequest = await deleteFriendship({ senderUsername, recipientUsername });

    if (friendRequest.success) {
        redirect(302, `/profile/${recipientUsername}`)
    } else {
        error(520);
    }

}) satisfies PageServerLoad;