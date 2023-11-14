import { loginUserSchema } from "$lib/data/validation_schemas/loginUserSchema";
import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { message, superValidate } from "sveltekit-superforms/server";
import loginUserAndReturnSession from "$lib/db/queries/authentication/loginUserAndReturnSession";
import { redirect } from "sveltekit-flash-message/server";
import type { Session } from "lucia";

export const load = (async (event) => {
    const form = await superValidate(event, loginUserSchema);
    return {
        form
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async (event) => {
        const { request, locals } = event;

        const form = await superValidate(request, loginUserSchema);

        if (!form.valid) {
            return fail(400, { form });
        }

        const response = await loginUserAndReturnSession(form.data);

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
