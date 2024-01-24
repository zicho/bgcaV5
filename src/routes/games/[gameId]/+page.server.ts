import type { PageServerLoad } from "./$types";
import { error, redirect } from "@sveltejs/kit";
import { isNumber } from "$lib/utils/validators/isNumber";
import { getGame } from "$lib/db/queries/games/getGame";

export const load = (async ({ params }) => {
	if (!isNumber(params.gameId)) {
		throw error(400, "Invalid game id in URL");
	}

	const game = (await getGame({ gameId: Number(params.gameId) })).result;

	if (!game) {
		throw error(404, `Could not find game with id ${params.gameId}`);
	}

	throw redirect(302, `/games/${params.gameId}/${game?.slug}`);
}) satisfies PageServerLoad;