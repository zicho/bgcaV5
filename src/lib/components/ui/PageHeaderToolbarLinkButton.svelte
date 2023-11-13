<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	export let displayText: string;
	export let url: string;
	export let id: string;
	export let icon: typeof SvelteComponent<any, SVGAElement> | undefined = undefined;

	export let className: 'primary' | 'secondary' = 'primary';
</script>

<a href={url} {id} data-testid={id} class="btn btn-{className} w-full md:flex-grow xl:btn-wide">
	{#if icon}
		<svelte:component this={icon} class="mr-4 md:mr-0" />
	{/if}
	{displayText}
</a>
