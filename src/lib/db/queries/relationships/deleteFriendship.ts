import { DataRetrievalFail } from "$lib/data/strings/ErrorMessages";
import { ApiResponse, failedResponse, successfulResponse } from "$lib/data/types/ApiResponse";
import { db } from "$lib/db/client";
import { friends as f } from "$lib/db/schema/relationships";
import { and, eq, or } from "drizzle-orm";

export async function deleteFriendship({ senderUsername, recipientUsername }: { senderUsername: string, recipientUsername: string }): Promise<ApiResponse<boolean>> {
    try {
        await db
            .delete(f)
            .where(
                or(
                    and(
                        eq(f.recipientUsername, recipientUsername),
                        eq(f.senderUsername, senderUsername),
                    ),
                    and(
                        eq(f.recipientUsername, senderUsername),
                        eq(f.senderUsername, recipientUsername),
                    )
                ));


        return successfulResponse(true);
    } catch (err) {
        console.log(err);
        return failedResponse(DataRetrievalFail);
    }
}