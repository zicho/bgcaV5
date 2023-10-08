<script lang="ts">
	import type { ILinkButton } from '$lib/interfaces/components/ILinkButton';

	export let props: ILinkButton;
	export let extraClasses: string = '';
</script>

<a href={props.href} id={props.id} data-testid={props.id} class="btn btn-link {extraClasses}"
	>{props.label}</a
>
