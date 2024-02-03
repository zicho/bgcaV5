import { DataRetrievalFail } from "$lib/data/strings/ErrorMessages";
import { ApiResponse, failedResponse, successfulResponse } from "$lib/data/types/ApiResponse";
import { db } from "$lib/db/client";
import { friends } from "$lib/db/schema/relationships";
import { or, and, eq } from "drizzle-orm";

type Friend = typeof friends.$inferSelect;

export async function getFriendship({ senderUsername, recipientUsername }:
    { senderUsername: string, recipientUsername: string }): Promise<ApiResponse<Friend>> {
    try {
        const relationship = (await db.select().
            from(friends).where(
                or(
                    and(
                        eq(friends.recipientUsername, recipientUsername),
                        eq(friends.senderUsername, senderUsername),
                    ),
                    and(
                        eq(friends.recipientUsername, senderUsername),
                        eq(friends.senderUsername, recipientUsername),
                    )
                )
            ))[0];

        return successfulResponse(relationship);
    } catch(err) {
        console.log(err);
        return failedResponse(DataRetrievalFail);
    }

}
