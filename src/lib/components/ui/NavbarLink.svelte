<script lang="ts">
	import type { INavbarLink } from '$lib/components/interfaces/components/INavbarLink';
	import type { SvelteComponent } from 'svelte';
	export let props: INavbarLink;
	export let extraClasses: string = '';

	const id = props.mobile ? `${props.id}-mobile` : props.id;

	const icon = props.icon as typeof SvelteComponent;
</script>

<li class="flex justify-start {extraClasses}" {id} data-testid={id}>
	<a
		href={props.url}
		aria-label={props.aria}
		class="lg:hover:text-neutral-content flex items-center w-full"
	>
		<svelte:component this={props.icon} class="mr-4 md:mr-0" />
		{props.displayText}
	</a>
</li>

<style>
	a {
		color: inherit !important;
	}

	a:hover {
		color: inherit !important;
	}
</style>
