<script lang="ts">
	import type LinkButtonProps from '$lib/components/props/components/LinkButtonProps';

	export let props: LinkButtonProps;
	export let extraClasses: string = '';
</script>

<a
	href={props.href}
	target="{props.external ? '_blank' : ''}"
	id={props.id}
	data-testid={props.id}
	class="btn {props.type ? `btn-${props.type}` : 'btn-link'} {extraClasses}"
	class:btn-disabled={props.disabled}
	type="submit"
>
	{#if props.icon && !props.alignIconRight}
		<svelte:component this={props.icon} class="mr-4 md:mr-0" />
	{/if}

	{props.label}

	{#if props.icon && props.alignIconRight}
		<svelte:component this={props.icon} class="ml-4 md:ml-0" />
	{/if}
</a>
