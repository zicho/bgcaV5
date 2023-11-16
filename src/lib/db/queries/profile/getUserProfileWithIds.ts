import { DataRetrievalFail } from "$lib/data/strings/ErrorMessages";
import { successfulResponse, type ApiResponse, failedResponse } from "$lib/data/types/ApiResponse";
import { db } from "$lib/db/client";
import { userProfiles, users } from "$lib/db/schema/users";
import { eq } from "drizzle-orm";

export type UpdateProfileModel = typeof userProfiles.$inferInsert;

export async function getUserProfileWithIds({ userId }: { userId: string }): Promise<ApiResponse<UpdateProfileModel>> {
    try {
        const userAndProfile = (await db
            .select()
            .from(userProfiles)
            .where(eq(userProfiles.userId, userId)))[0];

        return successfulResponse(userAndProfile);
    } catch {
        return failedResponse(DataRetrievalFail);
    }
}