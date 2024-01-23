import type { PageServerLoad } from "./$types";
import { error, redirect } from "@sveltejs/kit";
import { isNumber } from "$lib/utils/validators/isNumber";
import { getGame } from "$lib/db/queries/games/getGame";

export const load = (async ({ params }) => {
	if (!isNumber(params.bggId)) {
		throw error(400, "Invalid game id in URL");
	}

	const game = (await getGame({ bggId: Number(params.bggId) })).result;

	if (!game) {
		throw error(404, `Could not find game with id ${params.bggId}`);
	}

	throw redirect(302, `/games/${params.bggId}/${game?.slug}`);
}) satisfies PageServerLoad;