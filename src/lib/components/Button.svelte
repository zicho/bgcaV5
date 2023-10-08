<script lang="ts">
	import type { IButton } from '$lib/interfaces/components/IButton';

	export let props: IButton;
	export let extraClasses: string = '';
</script>

<button id={props.id} data-testid={props.id} class="btn btn-{props.type || 'neutral'} {extraClasses}">{props.label}</button>
