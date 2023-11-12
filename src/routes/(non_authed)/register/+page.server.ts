import { fail, type Actions } from "@sveltejs/kit";
import { redirect } from "sveltekit-flash-message/server";
import type { PageServerLoad } from "./$types";
import { message, superValidate } from "sveltekit-superforms/server";
import registerUserSchema from "$lib/data/validation_schemas/registerUserSchema";
import registerUserAndReturnSession from "$lib/db/queries/authentication/registerUserAndReturnSession";

export const load = (async (event) => {
    const form = await superValidate(event, registerUserSchema);

    const newData = { ...form.data };

    newData.password = "";
    newData.confirm_password = "";

    form.data = newData;


    return {
        form
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async (event) => {
        const { request, locals } = event;

        const form = await superValidate(request, registerUserSchema);

        if (!form.valid) {

            const newData = { ...form.data };

            newData.password = "";
            newData.confirm_password = "";

            form.data = newData;

            if ("username" in form.errors) {
                message(form, "Username needs to be at least 3 characters and can only contain numbers, letters and underscores.");
            }
            return fail(400, { form });
        }

        const response = await registerUserAndReturnSession(form.data);

        if (response.error) {

            const newData = { ...form.data };

            newData.password = "";
            newData.confirm_password = "";

            form.data = newData;

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
