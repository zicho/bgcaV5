<script lang="ts">
	import type { PageData } from './$types';
	import BasePageLayout from '$lib/components/layout/BasePageLayout.svelte';
	import PageHeaderToolbar from '$lib/components/ui/PageHeaderToolbar.svelte';
	import PageHeaderToolbarLinkButton from '$lib/components/ui/PageHeaderToolbarLinkButton.svelte';
	import { CreateEventIcon, PlusIcon } from '$lib/data/icons';
	export let data: PageData;

	const { game } = data;
</script>

<BasePageLayout>
	<PageHeaderToolbar title="Games" subheader="Find and view games">
		<PageHeaderToolbarLinkButton
			displayText="Create event"
			id="create-event-btn"
			url="/events/create/{game?.id}"
			icon={CreateEventIcon}
		/>
		<PageHeaderToolbarLinkButton
			displayText="Add to collection"
			id="add-to-collection-btn"
			url="/games/add/{game?.id}"
			icon={PlusIcon}
		/>
	</PageHeaderToolbar>

	<div class="flex flex-col lg:flex-row lg:gap-16">
		<div class="max-w-96">
			<img src={game?.imageUrl} alt="{game?.name} cover art" class="max-w-96 max-h-96" />
		</div>
		<div class="prose">
			<h3>{game?.name}</h3>
			<p>{game?.desc ? game?.desc : 'Description missing'}</p>
		</div>
	</div>
</BasePageLayout>
