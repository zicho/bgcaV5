import type { PageServerLoad } from "./$types";
import { error, redirect } from "@sveltejs/kit";
import { isNumber } from "$lib/utils/validators/isNumber";
import { getGame } from "$lib/db/queries/games/getGame";
import { removeFromCollection } from "$lib/db/queries/games/removeFromCollection";
import { addToCollection } from "$lib/db/queries/games/addToCollection";

export const load = (async ({ params, parent }) => {
	if (!isNumber(params.gameId)) {
		throw error(400, "Invalid game id in URL");
	}

    const { userId } = (await parent()).user;

	const game = (await getGame({ gameId: Number(params.gameId) })).result;

	if (!game) {
		throw error(404, `Could not find game with id ${params.gameId}`);
	} else {
        await addToCollection({ userId, id: game.gameId });
    }

	throw redirect(302, `/games/${params.gameId}/${game?.slug}`);
}) satisfies PageServerLoad;