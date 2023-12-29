<script lang="ts">
	import type LinkButtonProps from '$lib/components/props/components/LinkButtonProps';

	export let props: LinkButtonProps;
	export let extraClasses: string = '';
</script>

<a
	href={props.href}
	id={props.id}
	data-testid={props.id}
	class="btn {props.type ? `btn-${props.type}` : 'btn-link'} {extraClasses}"
	class:btn-disabled={props.disabled}
>
	{props.label}
</a>
