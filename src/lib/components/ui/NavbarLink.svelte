<script lang="ts">
	import type { NavbarLinkProps } from '$lib/components/props/components/NavbarLinkProps';
	export let props: NavbarLinkProps;
	export let extraClasses: string = '';
</script>

<li class="flex justify-start {extraClasses}" id={props.id} data-testid={props.id}>
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
