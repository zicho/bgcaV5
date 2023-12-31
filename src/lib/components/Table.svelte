<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import LinkButton from '$lib/components/LinkButton.svelte';
	import type LinkButtonProps from '$lib/components/props/components/LinkButtonProps';
	import { FirstPageIcon, LastPageIcon, NextPageIcon, PrevPageIcon } from '$lib/data/icons';
	import { afterNavigate } from '$app/navigation';
	import type TableProps from './props/components/TableProps';

	export let props: TableProps;

	$: ({ limit, searchParam, pageNo, totalPages, totalHits, resultsEmpty } = props);

	const resultsEmptyMessageFallback = "No results!";

	$: pageArray = Array.from({ length: totalPages }, (_, i) => i + 1); // [1,2,3,4,5,6,7,8,9,10]

	let timer: NodeJS.Timeout | null = null;
	let searchQuery: string = '';
	let searchForm: HTMLFormElement;
	let inputField: HTMLInputElement;

	let scriptUser: boolean = false;

	onMount(() => (scriptUser = true));

	afterNavigate(() => {
		if ($page.url.searchParams.get('search') !== null) {
			inputField.focus();
		}
	});

	function startTimer() {
		if (timer) {
			clearTimeout(timer);
		}

		timer = setTimeout(() => {
			searchForm.requestSubmit();
		}, 1000);
	}

	function resetTimer() {
		clearTimeout(timer as NodeJS.Timeout);
		startTimer();
	}

	$: goToFirstPageLinkButtonProps = {
		id: 'first-page-link-button',
		label: 'First',
		type: 'secondary',
		disabled: pageNo == 1 || totalPages == 0,
		icon: FirstPageIcon,
		href: `${$page.url.pathname}?page=1&search=${searchParam}&limit=${limit}`
	} satisfies LinkButtonProps;

	$: prevPageLinkButtonProps = {
		id: 'prev-page-link-button',
		label: 'Previous',
		type: 'primary',
		disabled: pageNo == 1 || totalPages == 0,
		icon: PrevPageIcon,
		href: `${$page.url.pathname}?page=${pageNo - 1}&search=${searchParam}&limit=${limit}`
	} satisfies LinkButtonProps;

	$: nextPageLinkButtonProps = {
		id: 'next-page-link-button',
		label: 'Next',
		type: 'primary',
		disabled: pageNo == totalPages || totalPages == 0,
		icon: NextPageIcon,
		alignIconRight: true,
		href: `${$page.url.pathname}?page=${pageNo + 1}&search=${searchParam}&limit=${limit}`
	} satisfies LinkButtonProps;

	$: gotoLastPageLinkButtonProps = {
		id: 'last-page-link-button',
		label: 'Last',
		type: 'secondary',
		disabled: pageNo == totalPages || totalPages == 0,
		icon: LastPageIcon,
		alignIconRight: true,
		href: `${$page.url.pathname}?page=${totalPages}&search=${searchParam}&limit=${limit}`
	} satisfies LinkButtonProps;
</script>

<div class="overflow-x-auto">
	<div class="flex flex-col xl:flex-row xl:space-y-0 space-y-4 py-4 items-center justify-between">
		<form
			id="searchForm"
			bind:this={searchForm}
			on:change={() => searchForm.requestSubmit()}
			class="space-x-0 space-y-2 flex-col xl:space-y-0 xl:space-x-2 xl:flex-row w-full"
		>
			<label for="search-query-input-field" class="label-text">Search title</label>
			<input
				bind:this={inputField}
				name="search"
				id="search-query-input-field"
				data-testid="search-query-input-field"
				bind:value={searchQuery}
				on:input={resetTimer}
				placeholder="Search by title"
				aria-label="Search by title"
				class="input input-bordered w-full md:w-auto"
			/>
			<label for="limit" class="label-text">Results per page</label>
			<select
				on:change={() => searchForm.requestSubmit()}
				name="limit"
				id="limit"
				data-testid="limit-results-select-dropdown"
				class="select select-bordered xl:mt-0 w-full xl:w-auto"
			>
				<option selected={limit == 10}>10</option>
				<option selected={limit == 25}>25</option>
				<option selected={limit == 50}>50</option>
				<option selected={limit == 100}>100</option>
			</select>
		</form>
		<div class="mr-auto flex items-center w-full xl:w-auto">
			<!-- If user does not have JS, enable this form by adding a button (not needed for JS users!) -->
			<noscript>
				<button
					type="submit"
					form="searchForm"
					class="hidden w-full xl:w-auto btn btn-wide btn-primary">search</button
				>
			</noscript>
		</div>
	</div>

	<div class="flex items-center justify-between mb-4 flex-col xl:space-x-2 xl:flex-row">
		<div class="space-x-0 xl:space-x-4 space-y-2 xl:space-y-0 flex flex-col xl:flex-row w-full">
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
					data-testid="page-number-text-input"
					type="text"
					name="page"
					disabled={totalPages == 0}
					value={pageNo}
				/>
			{:else}
				<select
					name="page"
					id="page"
					data-testid="page-number-select-dropdown"
					class="select select-bordered xl:mt-0 w-full xl:w-auto"
					value={pageNo}
					form="searchForm"
					on:change={() => searchForm.requestSubmit()}
				>
					{#each pageArray as page}
						<option selected>{page}</option>
					{/each}
				</select>
			{/if}

			<span class="ml-2">
				of {totalPages} <span class="label-text font-thin">({totalHits} hits)</span>
			</span>
		</div>

		<div
			class="space-x-0 xl:space-x-4 space-y-2 xl:space-y-0 flex flex-col xl:flex-row w-full justify-end"
		>
			<LinkButton props={nextPageLinkButtonProps} extraClasses="flex-1" />
			<LinkButton props={gotoLastPageLinkButtonProps} extraClasses="flex-1" />
		</div>
	</div>

	{#if resultsEmpty}
		<div class="prose-xl text-center mt-16">
			<span>{props.resultsEmptyMessage || resultsEmptyMessageFallback}</span>
		</div>
	{:else}
		<table class="table w-full table-auto">
			<thead>
				<tr>
					<slot name="headers" />
				</tr>
			</thead>
			<tbody>
				<slot name="body" />
			</tbody>
		</table>
	{/if}
</div>
