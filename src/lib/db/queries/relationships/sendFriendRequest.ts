import { DataRetrievalFail } from "$lib/data/strings/ErrorMessages";
import { ApiResponse, failedResponse, successfulResponse } from "$lib/data/types/ApiResponse";
import { db } from "$lib/db/client";
import { friends as f } from "$lib/db/schema/relationships";

export async function sendFriendRequest({ senderUsername, recipientUsername }: { senderUsername: string, recipientUsername: string }): Promise<ApiResponse<boolean>> {
    try {
        await db
            .insert(f)
            .values(
                {
                    senderUsername,
                    recipientUsername,
                }
            )
            .onConflictDoNothing();

        return successfulResponse(true);
    } catch (err) {
        console.log(err);
        return failedResponse(DataRetrievalFail);
    }
}