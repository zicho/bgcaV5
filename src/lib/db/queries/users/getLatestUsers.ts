import { DataRetrievalFail } from "$lib/data/strings/ErrorMessages";
import { ApiResponse, failedResponse, successfulResponse } from "$lib/data/types/ApiResponse";
import { db } from "$lib/db/client";
import { users } from "$lib/db/schema/users";

type User = typeof users.$inferSelect

export async function getLatestUsers({ limit = 10 }: { limit?: number } = {}): Promise<ApiResponse<User[]>> {
    try {
        const latest = await db
            .select()
            .from(users)
            .orderBy(users.createdAt)
            .limit(limit);

        return successfulResponse(latest)
    } catch (err) {
        console.log(err);
        return failedResponse(DataRetrievalFail);
    }
}