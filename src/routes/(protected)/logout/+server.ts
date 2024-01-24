import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { auth } from "$lib/server/lucia";

export const GET: RequestHandler = async ({ locals }) => {
	const session = await locals.auth.validate();

	if (!session) {
		redirect(302, "/login");
	}

	auth.invalidateSession(session.sessionId);
	locals.auth.setSession(null);

	redirect(302, "/login");
};