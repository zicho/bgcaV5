<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import LinkButton from '$lib/components/LinkButton.svelte';
	import type LinkButtonProps from '$lib/components/props/components/LinkButtonProps';
	import { FirstPageIcon, LastPageIcon, NextPageIcon, PrevPageIcon } from '$lib/data/icons';
	import { afterNavigate } from '$app/navigation';
	import type TableProps from '../props/components/TableProps';
	import type ButtonProps from '../props/components/ButtonProps';

	export let props: TableProps;

	$: ({ limit, pageNo, searchParam, totalPages, totalHits, resultsEmpty } = props);

	const resultsEmptyMessageFallback = 'No results for search';

	$: pageArray = Array.from({ length: totalPages }, (_, i) => i + 1); // [1,2,3,4,5,6,7,8,9,10]

	let timer: NodeJS.Timeout | null = null;
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

<div>
	<div>
		<form
			id="searchForm"
			bind:this={searchForm}
			on:change={() => searchForm.requestSubmit()}
			class="flex flex-col md:flex-row md:space-x-2 mb-4 w-full"
		>
			<div class=" w-full mb-4 lg:mb-0 lg:w-1/2 xl:w-1/4">
				<label for="search-query-input-field" class="label-text">Search title</label>
				<input
					bind:this={inputField}
					name="search"
					id="search-query-input-field"
					data-testid="search-query-input-field"
					on:input={resetTimer}
					placeholder="Search by title"
					aria-label="Search by title"
					class="input input-bordered w-full"
				/>
			</div>
			<div class="w-full mb-4 lg:mb-0 lg:w-1/2 xl:w-1/4">
				<label for="limit" class="label-text">Results per page</label>
				<select
					on:change={() => searchForm.requestSubmit()}
					name="limit"
					id="limit"
					data-testid="limit-results-select-dropdown"
					class="select select-bordered w-full"
					disabled={resultsEmpty}
				>
					<option selected={limit == 10}>10</option>
					<option selected={limit == 25}>25</option>
					<option selected={limit == 50}>50</option>
					<option selected={limit == 100}>100</option>
				</select>
			</div>
			<noscript>
				<button type="submit" class="hidden" aria-hidden="true">Submit</button>
			</noscript>
		</form>
	</div>
	{#if !resultsEmpty}
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

			<div class="space-x-0 space-y-2 flex w-full flex-col md:space-x-4 md:space-y-0 md:flex-row">
				<LinkButton props={nextPageLinkButtonProps} extraClasses="flex-1" />
				<LinkButton props={gotoLastPageLinkButtonProps} extraClasses="flex-1" />
			</div>
		</div>
	{/if}

	{#if resultsEmpty}
		<div class="prose-xl text-center mt-16">
			<span>{@html props.resultsEmptyMessage || resultsEmptyMessageFallback}</span>
		</div>
	{:else}
		<div class="flex flex-row space-x-4 invisible lg:visible">
			<slot name="headers" />
		</div>
		<slot name="body" />
	{/if}

	{#if !resultsEmpty}
		<div class="flex items-center justify-between mb-4 flex-col mt-16 xl:space-x-2 xl:flex-row">
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

			<div class="space-x-0 space-y-2 flex w-full flex-col md:space-x-4 md:space-y-0 md:flex-row">
				<LinkButton props={nextPageLinkButtonProps} extraClasses="flex-1" />
				<LinkButton props={gotoLastPageLinkButtonProps} extraClasses="flex-1" />
			</div>
		</div>
	{/if}
</div>
