import { friends as f } from "$lib/db/schema/relationships";

type Friend = typeof f.$inferSelect;

type FriendListViewModel = {
    name: string;
    friendsSince: string | null;
    relationshipStatus: Friend["requestStatus"];
    selected: boolean;
};

export class FriendListViewModelMapper {
    static map(data: Friend, username: string): FriendListViewModel {
        return {
            name: (data.senderUsername === username) ? data.recipientUsername : data.senderUsername,
            friendsSince: data.repliedAt,
            relationshipStatus: data.requestStatus,
            selected: true,
        };
    }
}
