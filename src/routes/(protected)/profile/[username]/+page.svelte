<script lang="ts">
	import { page } from '$app/stores';
	import BasePageLayout from '$lib/components/layout/BasePageLayout.svelte';
	import FriendRequestButton from '$lib/components/ui/FriendRequestButton.svelte';
	import PageHeaderToolbar from '$lib/components/ui/PageHeaderToolbar.svelte';
	import PageHeaderToolbarLinkButton from '$lib/components/ui/PageHeaderToolbarLinkButton.svelte';
	import {
		EditProfileIcon,
		FriendRequestPendingIcon,
		ManageFriendsIcon,
		MinusIcon,
		SendMessageIcon
	} from '$lib/data/icons';
	import type { PageData } from './$types';

	export let data: PageData;

	const { profile, friendshipStatus } = data;
</script>

<BasePageLayout>
	<PageHeaderToolbar
		title={data.isProfileYours ? 'Your profile' : `${$page.params.username}`}
		subheader={data.isProfileYours
			? 'Edit your profile'
			: `This is the profile of ${$page.params.username}`}
	>
		{#if data.isProfileYours}
			<PageHeaderToolbarLinkButton
				displayText="Manage friends"
				id="profile-edit-profile-btn"
				url="/friends"
				icon={ManageFriendsIcon}
			/>
			<PageHeaderToolbarLinkButton
				displayText="Edit profile"
				id="profile-edit-profile-btn"
				url="/profile/{$page.params.username}/edit"
				icon={EditProfileIcon}
			/>
		{:else}
			<FriendRequestButton model={friendshipStatus} />
			<PageHeaderToolbarLinkButton
				displayText="Send message"
				id="profile-send-message-btn"
				url="/message/{$page.params.username}"
				icon={SendMessageIcon}
			/>
		{/if}
	</PageHeaderToolbar>

	<div class="prose">
		{#if profile?.description}
			{profile?.description}
		{:else if data.isProfileYours}
			<p>
				<i
					>You have not written a description yet! <a
						data-testid="link-edit-your-profile"
						href="/profile/{$page.params.username}/edit">Do it!</a
					></i
				>
			</p>
		{:else}
			<i>This user has not written a description yet :(</i>
		{/if}
	</div>
</BasePageLayout>
