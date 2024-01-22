<script lang="ts">
	import { FirstPageIcon, LastPageIcon, NextPageIcon, PrevPageIcon } from '$lib/data/icons';
	import LinkButton from '../LinkButton.svelte';
	import { page } from '$app/stores';
	import type LinkButtonProps from '../props/components/LinkButtonProps';
	import type TablePaginatorProps from '../props/components/TablePaginatorProps';
	import { createEventDispatcher, onMount } from 'svelte';

	export let props: TablePaginatorProps;

	$: ({ totalPages, totalHits, pageNo, pageNoArray, searchParam, limit } = props);
	const dispatch = createEventDispatcher();

	let scriptUser: boolean = false;

	onMount(() => (scriptUser = true));

	$: goToFirstPageLinkButtonProps = {
		id: `${props.id}-first-page-link-button`,
		label: 'First',
		type: 'secondary',
		disabled: pageNo == 1 || totalPages == 0,
		icon: FirstPageIcon,
		href: `${$page.url.pathname}?page=1&search=${searchParam}&limit=${limit}`
	} satisfies LinkButtonProps;

	$: prevPageLinkButtonProps = {
		id: `${props.id}-prev-page-link-button`,
		label: 'Previous',
		type: 'primary',
		disabled: pageNo == 1 || totalPages == 0,
		icon: PrevPageIcon,
		href: `${$page.url.pathname}?page=${pageNo - 1}&search=${searchParam}&limit=${limit}`
	} satisfies LinkButtonProps;

	$: nextPageLinkButtonProps = {
		id: `${props.id}-next-page-link-button`,
		label: 'Next',
		type: 'primary',
		disabled: pageNo == totalPages || totalPages == 0,
		icon: NextPageIcon,
		alignIconRight: true,
		href: `${$page.url.pathname}?page=${pageNo + 1}&search=${searchParam}&limit=${limit}`
	} satisfies LinkButtonProps;

	$: gotoLastPageLinkButtonProps = {
		id: `${props.id}-last-page-link-button`,
		label: 'Last',
		type: 'secondary',
		disabled: pageNo == totalPages || totalPages == 0,
		icon: LastPageIcon,
		alignIconRight: true,
		href: `${$page.url.pathname}?page=${totalPages}&search=${searchParam}&limit=${limit}`
	} satisfies LinkButtonProps;
</script>

<div class="flex items-center justify-between mb-4 flex-col xl:space-x-2 xl:flex-row">
	<div class="space-x-0 space-y-2 flex w-full flex-col md:space-x-4 md:space-y-0 md:flex-row">
		<LinkButton props={goToFirstPageLinkButtonProps} extraClasses="flex-1" />
		<LinkButton props={prevPageLinkButtonProps} extraClasses="flex-1" />
	</div>

	<div class="py-4 xl:py-0 flex items-center justify-center w-full">
		<span class="mr-2">Page</span>

		<label for="page" class="hidden" />
		{#if !scriptUser}
			<input
				class="w-16 p-2 border border-gray-300 rounded-md h-full"
				form="searchForm"
				name="page"
				id="{props.id}-page-number-text-input"
				data-testid="{props.id}-page-number-text-input"
				type="text"
				disabled={totalPages <= 1}
				value={pageNo}
			/>
		{:else}
			<select
				name="{props.id}-page-number-select-dropdown"
				data-testid="{props.id}-page-number-select-dropdown"
				id="{props.id}-page-number-select-dropdown"
				class="select select-bordered xl:mt-0 w-full xl:w-auto"
				value={pageNo}
				form="searchForm"
				disabled={totalPages <= 1}
				on:change={() => dispatch('pageChanged')}
			>
				{#each pageNoArray as pageNo}
					<option selected>{pageNo}</option>
				{/each}
			</select>
		{/if}

		<span class="ml-2">
			of {totalPages} <span class="label-text font-thin">({totalHits} hits)</span>
		</span>
	</div>

	<div class="space-x-0 space-y-2 flex w-full flex-col md:space-x-4 md:space-y-0 md:flex-row">
		<LinkButton props={nextPageLinkButtonProps} extraClasses="flex-1" />
		<LinkButton props={gotoLastPageLinkButtonProps} extraClasses="flex-1" />
	</div>
</div>
