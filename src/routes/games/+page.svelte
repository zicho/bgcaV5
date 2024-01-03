<script lang="ts">
	import { page } from '$app/stores';
	import Table from '$lib/components/table/Table.svelte';
	import BasePageLayout from '$lib/components/layout/BasePageLayout.svelte';
	import type TableProps from '$lib/components/props/components/TableProps';
	import PageHeaderToolbar from '$lib/components/ui/PageHeaderToolbar.svelte';
	import PageHeaderToolbarLinkButton from '$lib/components/ui/PageHeaderToolbarLinkButton.svelte';
	import { CollectionIcon } from '$lib/data/icons';
	import type { PageData } from './$types';
	import placeholderImg from '$lib/assets/cover_art_missing.png';
	import TableHeader from '$lib/components/table/TableHeader.svelte';
	import TableItemGame from '$lib/components/table/TableItemGame.svelte';

	export let data: PageData;

	$: ({ games } = data);
	$: props = {
		...data
	} satisfies TableProps;
</script>

<svelte:head>
	<title>Games</title>
</svelte:head>

<BasePageLayout>
	<PageHeaderToolbar title="Games" subheader="Find and view games">
		<PageHeaderToolbarLinkButton
			displayText="View your collection"
			id="games-go-to-collection-btn"
			url="/games/collection"
			icon={CollectionIcon}
		/>
	</PageHeaderToolbar>
	<Table {props}>
		<slot slot="headers">
			<!-- Cover art -->
			<TableHeader />
			<TableHeader name="Name" width="w-44" />
			<TableHeader name="About" fullWidth />
			<TableHeader name="Rating" width="w-24" />
			<!-- Link to desc -->
			<TableHeader />
		</slot>
		<slot slot="body">
			{#each games as game}
				<TableItemGame {game} />
				<!-- <tr>
					<td class="pl-0">
						<div class="flex items-center space-x-3">
							<div class="avatar">
								<div class="w-32 h-32">
									<a href="/games/{game.bggId}">
										<img
											src={game.thumbnailUrl || placeholderImg}
											alt={!game.thumbnailUrl
												? `${game.name} placeholder cover art`
												: `${game.name} cover art`}
										/>
									</a>
								</div>
							</div>
						</div>
					</td>
					<td class="px-0">
						<div class="flex items-center space-x-3">
							<div>
								<div class="font-bold hover:underline min-w-[200px]">
									<a href="/games/{game.bggId}">{game.name}</a>
								</div>
								<div class="text-sm opacity-50">{game.yearPublished}</div>
							</div>
						</div>
					</td>
					<td class="hidden sm:hidden md:table-cell p-0">
						<div class="flex">
							{#if game.desc}
								{game.desc}
							{:else}
								<i class="text-secondary">Description missing</i>
							{/if}
						</div>
					</td>

					<td>
						<div class="badge-neutral text-xl p-4 text-center">
							{game.averageRating?.substring(0, 3)}
						</div>
					</td>
					<th class="table-cell px-0">
						<a href="/games/{game.bggId}" class="btn btn-secondary">details</a>
					</th>
				</tr> -->
			{/each}
		</slot>
	</Table>
</BasePageLayout>
