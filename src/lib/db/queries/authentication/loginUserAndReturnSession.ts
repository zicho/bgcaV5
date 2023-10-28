import { CouldNotSignInUser, IncorrectUsernameOrPassword } from "$lib/data/strings/ErrorMessages";
import { successfulResponse, type ApiResponse, failedResponse } from "$lib/data/types/ApiResponse";
import { auth } from "$lib/server/lucia";
import { LuciaError, type Session } from "lucia";

export default async function loginUserAndReturnSession({ username, password }: { username: string, password: string }): Promise<ApiResponse<Session>> {
    try {
        const key = await auth.useKey("username", username.toLowerCase(), password);

        const session = await auth.createSession({
            userId: key.userId,
            attributes: {}
        });

        return successfulResponse(session);
    } catch (e) {
        // todo: log
        if (e instanceof LuciaError && (e.message === "AUTH_INVALID_KEY_ID" || e.message === "AUTH_INVALID_PASSWORD")
        ) {
            return failedResponse(IncorrectUsernameOrPassword);
        }
        
        return failedResponse(CouldNotSignInUser);
    }
}
