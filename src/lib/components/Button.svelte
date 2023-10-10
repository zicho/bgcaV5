<script lang="ts">
	import type { IButton } from '$lib/interfaces/components/IButton';

	export let props: IButton;
	export let extraClasses: string = '';
</script>

<button type="submit" id={props.id} data-testid={props.id} class="btn btn-{props.type} {extraClasses}">{props.label}</button>
