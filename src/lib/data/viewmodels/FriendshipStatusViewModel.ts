import { friends as f } from "$lib/db/schema/relationships";

type Friend = typeof f.$inferSelect;
type RelationshipStatus = "ACCEPTED" | "NONE" | "SENT" | "RECEIVED";

export type FriendshipStatusViewModel = {
    friendName: string;
    relationshipStatus: RelationshipStatus;
};

export class FriendshipStatusViewModelMapper {
    static map(data: Friend, username: string): FriendshipStatusViewModel {

        let relationshipStatus: RelationshipStatus = data ? "NONE" : "RECEIVED";


        if(data.requestStatus === "ACCEPTED") {
            relationshipStatus = "ACCEPTED";
        }

        if (data.senderUsername === username) {
            relationshipStatus = "SENT";
        }

        return {
            friendName: 
                data.senderUsername === username 
                ? data.recipientUsername
                : data.senderUsername,
            relationshipStatus
        }
    }
}
