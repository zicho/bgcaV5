import { DataRetrievalFail } from "$lib/data/strings/ErrorMessages";
import { successfulResponse, type ApiResponse, failedResponse } from "$lib/data/types/ApiResponse";
import { db } from "$lib/db/client";
import { userProfiles, users } from "$lib/db/schema/users";
import { eq } from "drizzle-orm";

type Profile = {
    username: string | null,
    description: string | null,
}

export async function getUserProfile({ username }: { username: string }): Promise<ApiResponse<Profile>> {
    try {
        const userAndProfile = await db
            .select({
                username: users.username,
                description: userProfiles.description
            })
            .from(users)
            .where(eq(users.username, username))
            .leftJoin(userProfiles, eq(userProfiles.userId, users.id));

        const profile = userAndProfile[0];

        return successfulResponse(profile);
    } catch {
        return failedResponse(DataRetrievalFail);
    }
}