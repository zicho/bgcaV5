import { DataRetrievalFail } from "$lib/data/strings/ErrorMessages";
import { ApiResponse, failedResponse, successfulResponse } from "$lib/data/types/ApiResponse";
import { db } from "$lib/db/client";
import { users } from "$lib/db/schema/users";
import { eq } from "drizzle-orm";

type User = typeof users.$inferSelect;

export async function findByUsername({ username }: { username: string }): Promise<ApiResponse<User>> {
    try {
        const user = (await db
            .select()
            .from(users)
            .where(eq(users.username, username)))[0];

        return successfulResponse(user)
    } catch (err) {
        console.log(err);
        return failedResponse(DataRetrievalFail);
    }
}