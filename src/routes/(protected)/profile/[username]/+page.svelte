<script lang="ts">
	import { page } from '$app/stores';
	import BasePageLayout from '$lib/components/layout/BasePageLayout.svelte';
	import PageHeaderToolbar from '$lib/components/ui/PageHeaderToolbar.svelte';
	import PageHeaderToolbarLinkButton from '$lib/components/ui/PageHeaderToolbarLinkButton.svelte';
	import type { PageData } from './$types';
	import UserIcon from 'virtual:icons/lucide/edit-3';
	import SendIcon from 'virtual:icons/lucide/send';

	export let data: PageData;
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
				displayText="Edit profile"
				id="profile-edit-profile-btn"
				url="/profile/{$page.params.username}/edit"
				icon={UserIcon} 
			/>
		{:else}
			<PageHeaderToolbarLinkButton
				displayText="Send message"
				id="profile-send-message-btn"
				url="/message/{$page.params.username}"
				icon={SendIcon} 
			/>
		{/if}
	</PageHeaderToolbar>
</BasePageLayout>
