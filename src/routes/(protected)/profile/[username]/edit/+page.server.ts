import { redirect, type Actions, fail, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getUserProfile } from '$lib/db/queries/profile/getUserProfile';
import { upsertProfileSchema } from '$lib/data/validation_schemas/upsertProfileSchema';
import { superValidate } from 'sveltekit-superforms/server';
import type { Session } from 'lucia';
import { upsertUserProfile } from '$lib/db/queries/profile/upsertUserProfile';
import type { UpdateProfileModel } from '$lib/db/queries/profile/getUserProfileWithIds';

export const load = (async (event) => {
	const { username } = (await event.parent()).user;

	if (event.params.username !== username) throw redirect(302, `/profile/${username}`);

	const form = await superValidate(event, upsertProfileSchema);
	const profile = await getUserProfile({ username });

	if (profile.error) {
		throw Error(profile.message);
	}

	form.data = { ...profile.result };

	return {
		form
	};
}) satisfies PageServerLoad;


export const actions: Actions = {
	default: async (event) => {
		const { request, params, locals } = event;

		const form = await superValidate(request, upsertProfileSchema);

		if (!form.valid) return fail(400, { form });

		const session: Session = (await locals.auth.validate()) as Session;

		if (!session) {
			throw error(403);
		}

		const model: UpdateProfileModel = {
			userId: session.user.userId,
			description: form.data.description
		}

		const result = await upsertUserProfile(model);

		if (result.error) {
			throw error(500, result.message);
		}

		throw redirect(
			302,
			`/profile/${params.username}`
		);
	}
}