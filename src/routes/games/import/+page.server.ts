import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { importCollectionSchema } from '$lib/data/validation_schemas/importCollectionSchema';
import { fail, redirect } from '@sveltejs/kit';
import importBggCollection from '$lib/server/integrations/importBggCollection';
import { getUser } from '$lib/server/utils/getUser';

export const load = (async (event) => {
    const form = await superValidate(event, importCollectionSchema);
    return {
        form
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async (event) => {
        const { request, locals } = event;

        // const formData = await request.formData();

        const form = await superValidate(request, importCollectionSchema);

        if (!form.valid) {
            return fail(400, { form });
        }

        const id = (await getUser(locals.auth)).userId;
        const response = await importBggCollection({ username: form.data['bgg-username-input'], userId: id });

        if(response.success) {
            throw redirect(302, "/games/collection");
        } else {
            return fail(400, { form });
        }
    }
};
