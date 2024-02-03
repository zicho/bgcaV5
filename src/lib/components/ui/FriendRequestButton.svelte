<script lang="ts">
	import { FriendshipStatusViewModel } from "$lib/data/viewmodels/FriendshipStatusViewModel";
	import LinkButton from "../LinkButton.svelte";
	import ButtonType from "../props/components/ButtonType";
	import LinkButtonProps from "../props/components/LinkButtonProps";

    export let model: FriendshipStatusViewModel;

    let label: string;
    let type: ButtonType;
    let href: string;
    let disabled: boolean;

    switch (model.relationshipStatus) {
        case "NONE":
            label = "Send friend request";
            type = "secondary"
            href = `/friends/${model.friendName}/add`
        case "ACCEPTED":
            label = "Friend";
            type = "primary"
            href = `/friends/${model.friendName}/remove`
        case "SENT":
            label = "Friend request sent";
            type = "secondary";
            disabled = true
        case "RECEIVED":
            label = "Accept friend request";
            type = "secondary";
            href = `/friends/${model.friendName}/add`
    }

    $: props = {
		id: `friend-request-button`,
		label,
		type,
		href,
        disabled
	} satisfies LinkButtonProps;
</script>

<LinkButton props={props} extraClasses="w-full" />
