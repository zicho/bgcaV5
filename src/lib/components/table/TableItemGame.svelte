<script lang="ts">
	export let game: BggGame;
	import placeholderImg from '$lib/assets/cover_art_missing.png';
	import LinkButton from '../LinkButton.svelte';
	import type LinkButtonProps from '../props/components/LinkButtonProps';
	import type { BggGame } from '$lib/server/integrations/dto/BggGame';
	import { createSlug } from '$lib/utils/createSlug';

	$: detailsButtonProps = {
		id: `go-to-details-game-${game.gameId}`,
		label: 'Details',
		type: 'secondary',
		href: `/games/${game.gameId}/${createSlug(game.name)}`
	} satisfies LinkButtonProps;
</script>

<div class="flex flex-row space-x-4 my-4">
	<div class="flex flex-none w-16 lg:w-32 items-center">
		<img
			src={game.thumbnail || placeholderImg}
			alt={!game.thumbnail ? `${game.name} placeholder cover art` : `${game.name} cover art`}
		/>
	</div>

	<div class="flex-grow lg:flex-none md:w-36 flex lg:items-center text-sm">
		<div>
			<a class="font-bold hover:underline" href="/games/{game.gameId}/{createSlug(game.name)}">{game.name}</a>
			<div class="text-sm opacity-50">{game.yearPublished}</div>
		</div>
	</div>

	<div class="lg:flex flex-grow lg:items-center text-sm hidden">
		{#if game.description}
			{@html game.description}
		{:else}
			<i class="text-secondary">Description missing</i>
		{/if}
	</div>

	<div class="flex flex-none w-16 lg:w-24 lg:items-center">
		<div class="badge-neutral text-xl flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16">
			{game?.averageRating === "0" ? "--" : game?.averageRating?.substring(0, 3)}
		</div>
	</div>

	<div class="flex flex-none w-32 lg:items-center">
		<LinkButton props={detailsButtonProps} extraClasses="w-full" />
	</div>
</div>

<div class="lg:flex flex-grow lg:items-center text-sm lg:hidden">
	{#if game.description}
		{@html game.description}
	{:else}
		<i class="text-secondary">Description missing</i>
	{/if}
</div>

<hr class="mt-4" />
