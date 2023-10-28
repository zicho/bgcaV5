import { CouldNotCreateUser, UsernameAlreadyTaken } from "$lib/data/strings/ErrorMessages";
import { successfulResponse, type ApiResponse, failedResponse } from "$lib/data/types/ApiResponse";
import { auth } from "$lib/server/lucia";
import { LuciaError, type Session } from "lucia";
import { generateRandomString } from "lucia/utils";

export default async function registerUserAndReturnSession({ username, password }: { username: string, password: string }): Promise<ApiResponse<Session>> {
    try {
        const user = await auth.createUser({
            userId: generateRandomString(15),
            key: {
                providerId: "username", // auth method
                providerUserId: username.toLowerCase(), // unique id when using "username" auth method
                password // hashed by Lucia
            },
            attributes: {
                username
            }
        });

        const session = await auth.createSession({
            userId: user.userId,
            attributes: {}
        });

        return successfulResponse(session);
    } catch (e) {
        // todo: log
        if (e instanceof LuciaError && e.message === "AUTH_DUPLICATE_KEY_ID") {
            return failedResponse(UsernameAlreadyTaken);
        }

        return failedResponse(CouldNotCreateUser);
    }
}
