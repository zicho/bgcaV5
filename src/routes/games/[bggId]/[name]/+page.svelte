<script lang="ts">
	import type { PageData } from './$types';
	import BasePageLayout from '$lib/components/layout/BasePageLayout.svelte';
	import PageHeaderToolbar from '$lib/components/ui/PageHeaderToolbar.svelte';
	import PageHeaderToolbarLinkButton from '$lib/components/ui/PageHeaderToolbarLinkButton.svelte';
	import { CreateEventIcon, MinusIcon, PlusIcon } from '$lib/data/icons';
	export let data: PageData;

	const { game } = data;
</script>

<svelte:head>
	<title>{game?.name}</title>
</svelte:head>

<BasePageLayout>
	<PageHeaderToolbar>
		<PageHeaderToolbarLinkButton
			displayText="Create event"
			id="create-event-btn"
			url="/events/create/{game?.id}"
			icon={CreateEventIcon}
		/>
		<PageHeaderToolbarLinkButton
			displayText={data.inYourCollection ? 'Remove from collection' : 'Add to collection'}
			id="add-to-collection-btn"
			className="primary"
			url="/games/collection/{data.inYourCollection ? 'remove' : 'add'}/{game?.bggId}"
			icon={data.inYourCollection ? MinusIcon : PlusIcon}
			forceReloadOnClick={true}
		/>
	</PageHeaderToolbar>

	<div class="hero">
		<div class="hero-content p-0 flex-col lg:flex-row max-w-none align-start">
			<img src={game?.imageUrl} alt="{game?.name} cover art" class="w-64 xl:self-start" />
			<div class="ml-4">
				<div class="grid grid-cols-1 xl:grid-cols-3 gap-4">
					<div class="col-span-2">
						<div class="flex flex-row mb-4">
							<div class="badge-neutral text-xl flex items-center justify-center w-16 h-16 mr-4">
								{game?.averageRating?.substring(0, 3)}
							</div>
							<h3 class="text-3xl font-bold">{game?.name} ({game?.yearPublished})</h3>
							
						</div>
						<p>{@html game?.desc}</p>
					</div>
					<div class="flex flex-initial flex-col gap-y-1 bg-base-200 p-4">
						<h3 class="text-xl font-bold">Game info</h3>
						<div class="divider m-0" />
						<div class="flex flex-row justify-between">
							<span class="font-bold">Player count: </span>
							<span>{game?.minNumberOfPlayers}-{game?.maxNumberOfPlayers}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</BasePageLayout>
