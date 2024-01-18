import type { Handle } from "@sveltejs/kit";
import { auth } from "$lib/server/lucia";
import type { Session } from "lucia";

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);

	const cookie = event.cookies.get("auth_session");

	if(cookie) {
		const valid = await event.locals.auth.validate();
		if(!valid) {
			const response = await resolve(event);

			const modifiedResponse = new Response(null, {
				status: 401,
				headers: {
				  ...response.headers,
				  'Set-Cookie': 'auth_session=; Max-Age=0; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
				},
			  });

			  return modifiedResponse;
		}
	}

	return await resolve(event);
};
