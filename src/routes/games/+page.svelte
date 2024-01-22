<script lang="ts">
	import Table from '$lib/components/table/Table.svelte';
	import BasePageLayout from '$lib/components/layout/BasePageLayout.svelte';
	import type TableProps from '$lib/components/props/components/TableProps';
	import PageHeaderToolbar from '$lib/components/ui/PageHeaderToolbar.svelte';
	import PageHeaderToolbarLinkButton from '$lib/components/ui/PageHeaderToolbarLinkButton.svelte';
	import { CollectionIcon, DownloadIcon } from '$lib/data/icons';
	import type { PageData } from './$types';

	import TableHeader from '$lib/components/table/TableHeader.svelte';
	import TableItemGame from '$lib/components/table/TableItemGame.svelte';

	export let data: PageData;

	$: ({ games } = data);
	$: props = {
		...data,
		resultsEmptyMessage: "Is your favorite game missing? <a class='underline text-primary' href='/'>Please help us by adding it to our database!</a>"
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
			<TableHeader name="Name" width="w-36" />
			<TableHeader name="About" fullWidth />
			<TableHeader name="Rating" width="w-24" />
			<!-- Link to desc -->
			<TableHeader />
		</slot>
		<slot slot="body">
			{#each games as game}
				<TableItemGame {game} />
			{/each}
		</slot>
	</Table>
</BasePageLayout>
