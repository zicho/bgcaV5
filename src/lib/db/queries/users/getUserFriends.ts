import { DataRetrievalFail } from "$lib/data/strings/ErrorMessages";
import { ApiResponse, failedResponse, successfulResponse } from "$lib/data/types/ApiResponse";
import { db } from "$lib/db/client";
import { friends as f } from "$lib/db/schema/relationships";
import { REQUEST_STATUS } from "$lib/db/schema/types";
import { or, and, eq } from "drizzle-orm";

type Friend = typeof f.$inferSelect

export async function getUserFriends({ username, status = REQUEST_STATUS.ACCEPTED }: { username: string, status?: REQUEST_STATUS }): Promise<ApiResponse<Friend[]>> {
    try {
        const friends = await db
            .select()
            .from(f)
            .orderBy(f.repliedAt)
            .where(and(or(eq(f.recipientUsername, username), eq(f.senderUsername, username)), eq(f.requestStatus, status)));

        return successfulResponse(friends)
    } catch (err) {
        console.log(err);
        return failedResponse(DataRetrievalFail);
    }
}