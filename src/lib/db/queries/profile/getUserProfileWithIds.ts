import { DataRetrievalFail } from "$lib/data/strings/ErrorMessages";
import { successfulResponse, type ApiResponse, failedResponse } from "$lib/data/types/ApiResponse";
import { db } from "$lib/db/client";
import { userProfiles, users } from "$lib/db/schema/users";
import { eq } from "drizzle-orm";

export type UpdateProfileModel = typeof userProfiles.$inferInsert;

export async function getUserProfileWithIds({ username }: { username: string }): Promise<ApiResponse<UpdateProfileModel>> {
    try {
        const userAndProfile = (await db
            .select({
                id: userProfiles.id,
                userId: users.id,
                username: users.username,
                description: userProfiles.description
            })
            .from(users)
            .where(eq(users.username, username))
            .leftJoin(userProfiles, eq(userProfiles.userId, users.id)))[0];

        const model = { 
            ...userAndProfile,
            id: userAndProfile.id || undefined
        };

        return successfulResponse(model);
    } catch {
        return failedResponse(DataRetrievalFail);
    }
}