// @ts-ignore
import { SECRET_PG_HOST } from "$env/static/private";
// @ts-ignore
import { dev } from "$app/environment";
import { lucia } from "lucia";
import postgres from "pg";
import { pg } from "@lucia-auth/adapter-postgresql";
import { sveltekit } from "lucia/middleware";
import "lucia/polyfill/node";

const connectionPool = new postgres.Pool({
	connectionString: SECRET_PG_HOST
});

export const auth = lucia({
	adapter: pg(connectionPool, {
		user: "auth_users",
		session: "auth_sessions",
		key: "auth_keys",
	}),
	env: dev ? "DEV" : "PROD",
	middleware: sveltekit(),
	getUserAttributes: (data) => {
		return {
			username: data.username
		};
	}
});

export type Auth = typeof auth;