import { fail, type Actions } from "@sveltejs/kit";
import { redirect } from "sveltekit-flash-message/server";
import type { PageServerLoad } from "./$types";
import { message, superValidate } from "sveltekit-superforms/server";
import registerUserSchema from "$lib/data/validation_schemas/registerUserSchema";
import registerUserAndReturnSession from "$lib/db/queries/authentication/registerUserAndReturnSession";

export const load = (async (event) => {
    const form = await superValidate(event, registerUserSchema);
    return {
        form
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async (event) => {
        const { request, locals } = event;

        const form = await superValidate(request, registerUserSchema);

        if (!form.valid) {
            if ("username" in form.errors) {
                message(form, "Username can only contain numbers, letters and underscores.");
            }
            return fail(400, { form });
        }

        const response = await registerUserAndReturnSession(form.data);

        if (response.error) {
            return message(form, response.message);
        } else {
            locals.auth.setSession(response.result);
        }

        throw redirect(
            302,
            "/",
            {
                type: "success",
                message: `Your account has been created!`
            },
            event
        );
    }
};
