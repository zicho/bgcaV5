<script lang="ts">
	import TablePaginator from './TablePaginator.svelte';
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';
	import type TableProps from '../props/components/TableProps';
	import type TablePaginatorProps from '../props/components/TablePaginatorProps';

	export let props: TableProps;

	$: ({ limit, pageNo, searchParam, totalPages, totalHits, resultsEmpty, loading } = props);

	const resultsEmptyMessageFallback = 'No results for search';

	$: pageNoArray = Array.from({ length: totalPages }, (_, i) => i + 1); // [1,2,3,4,5,6,7,8,9,10]

	let timer: NodeJS.Timeout | null = null;
	let searchForm: HTMLFormElement;
	let inputField: HTMLInputElement;

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
			// searchForm.requestSubmit();
		}, 1000);
	}

	function resetTimer() {
		clearTimeout(timer as NodeJS.Timeout);
		startTimer();
	}

	function triggerSearch() {
		searchForm.requestSubmit();
	}

	$: tablePaginatorTopProps = {
		id: 'table-paginator-top',
		searchParam,
		limit,
		totalPages,
		totalHits,
		pageNo,
		pageNoArray
	} satisfies TablePaginatorProps;

	$: tablePaginatorBottomProps = {
		...tablePaginatorTopProps,
		id: 'table-paginator-bottom'
	} satisfies TablePaginatorProps;
</script>

<div>
	<div>
		<form
			id="searchForm"
			bind:this={searchForm}
			on:change={() => triggerSearch()}
			on:submit={() => (loading = true)}
			class="flex flex-col md:flex-row md:space-x-2 mb-4 w-full"
		>
			<div class=" w-full mb-4 lg:mb-0 lg:w-1/2 xl:w-1/4">
				<label for="search-query-input-field" class="label-text">Search title</label>
				<input
					bind:this={inputField}
					value={searchParam}
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
					on:change={() => triggerSearch()}
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

	{#if loading}
		<div class="flex items-center justify-center mt-8">
			<span class="loading loading-spinner loading-lg"></span>
		</div>
	{:else}
		{#if !resultsEmpty}
			<div class="mb-8">
				<TablePaginator props={tablePaginatorTopProps} on:pageChanged={() => triggerSearch()} />
			</div>
		{/if}

		<hr class="mb-8" />

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
			<div class="mt-8">
				<TablePaginator props={tablePaginatorBottomProps} on:pageChanged={() => triggerSearch()} />
			</div>
		{/if}
	{/if}
</div>
