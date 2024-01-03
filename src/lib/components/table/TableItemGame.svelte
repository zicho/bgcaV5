<script lang="ts">
	import type { games } from '$lib/db/schema/games';

	type Game = Omit<
		typeof games.$inferSelect,
		'minNumberOfPlayers' | 'maxNumberOfPlayers' | 'imageUrl'
	>;

	export let game: Game;
	import placeholderImg from '$lib/assets/cover_art_missing.png';
	import LinkButton from '../LinkButton.svelte';
	import type LinkButtonProps from '../props/components/LinkButtonProps';

	let detailsButtonProps = {
		id: `go-to-details-game-${game.bggId}`,
		label: 'Details',
		type: 'secondary',
		href: `/games/${game.bggId}`
	} satisfies LinkButtonProps;
</script>

<div class="flex flex-row space-x-4 my-4">
	<div class="flex flex-none w-32 align-center items-center">
		<img
			src={game.thumbnailUrl || placeholderImg}
			alt={!game.thumbnailUrl ? `${game.name} placeholder cover art` : `${game.name} cover art`}
		/>
	</div>

	<div class="flex-none w-44 flex items-center">
		<div>
			<a class="font-bold hover:underline" href="/games/{game.bggId}">{game.name}</a>
            <div class="text-sm opacity-50">{game.yearPublished}</div>
		</div>
		
	</div>

	<div class="flex flex-grow items-center">
		{#if game.desc}
			{game.desc}
		{:else}
			<i class="text-secondary">Description missing</i>
		{/if}
	</div>

	<div class="flex flex-none w-24 items-center">
		<div class="badge-neutral text-xl p-4 text-center w-16">
			{game.averageRating?.substring(0, 3)}
		</div>
	</div>

	<div class="flex flex-none w-32 align-center items-center">
		<LinkButton props={detailsButtonProps} />
	</div>
</div>
