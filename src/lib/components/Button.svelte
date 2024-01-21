<script lang="ts">
	import type ButtonProps from '$lib/components/props/components/ButtonProps';
	import getButtonTypeClass from './utils/getButtonTypeClass';

	export let props: ButtonProps;
	export let extraClasses: string = '';

	let loading = false;
</script>

<button
	type="submit"
	id={props.id}
	data-testid={props.id}
	disabled={loading}
	on:click={() => (loading = true)}
	class="btn {getButtonTypeClass(props.type)} {extraClasses}"
>
	{#if !loading}
		{#if props.icon && !props.alignIconRight}
			<svelte:component this={props.icon} class="mr-4 md:mr-0" />
		{/if}

		{props.label}

		{#if props.icon && props.alignIconRight}
			<svelte:component this={props.icon} class="ml-4 md:ml-0" />
		{/if}
	{:else}
		<span class="loading loading-spinner loading-xs"></span>
	{/if}
</button>
