<script lang="ts">
	import { page } from '$app/stores';
	import Table from '$lib/components/table/Table.svelte';
	import BasePageLayout from '$lib/components/layout/BasePageLayout.svelte';
	import type TableProps from '$lib/components/props/components/TableProps';
	import PageHeaderToolbar from '$lib/components/ui/PageHeaderToolbar.svelte';
	import PageHeaderToolbarLinkButton from '$lib/components/ui/PageHeaderToolbarLinkButton.svelte';
	import { DownloadIcon } from '$lib/data/icons';
	import type { PageData } from './$types';
	import TableHeader from '$lib/components/table/TableHeader.svelte';
	import TableItemGame from '$lib/components/table/TableItemGame.svelte';

	export let data: PageData;

	$: ({ games } = data);
	$: props = {
		...data
	} satisfies TableProps;
</script>

<svelte:head>
	<title>Your collection</title>
</svelte:head>

<BasePageLayout>
	<PageHeaderToolbar title="Collection" subheader="View your game collection">
		<PageHeaderToolbarLinkButton
			displayText="Import collection"
			id="games-go-to-import-btn"
			url="/games/import"
			icon={DownloadIcon}
		/>
	</PageHeaderToolbar>

	{#if data.gamesInCollectionCount == 0}
		<div class="prose">
			<h3>Oh no!</h3>
			<p>Your collection is empty! :( If you have a <a target="_blank" href="https://www.boardgamegeek.com">BGG</a> account, you can <a href="/games/import">import</a>
			your collection from there. Otherwise you can add them manually.</p>
			<p>Go to <a href="/games">this page</a> to search for games!</p>
		</div>
	{:else}
		<Table {props}>
			<slot slot="headers">
				<!-- Cover art -->
				<TableHeader />
				<TableHeader name="Name" width="w-36" />
				<TableHeader name="About" fullWidth />
				<TableHeader name="Rating" width="w-24" />
				<!-- Link to desc -->
				<TableHeader />
			</slot>
			<slot slot="body">
				{#each games as game}
					<!-- <TableItemGame {game} /> -->
				{/each}
			</slot>
		</Table>
	{/if}
</BasePageLayout>
