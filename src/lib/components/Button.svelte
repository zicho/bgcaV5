<script lang="ts">
	import type { IButton } from '$lib/interfaces/components/IButton';
	import getButtonTypeClass from './utils/getButtonTypeClass';

	export let props: IButton;
	export let extraClasses: string = '';
</script>

<button
	type="submit"
	id={props.id}
	data-testid={props.id}
	class="btn {getButtonTypeClass(props.type)} {extraClasses}">{props.label}</button
>
