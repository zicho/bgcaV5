<script lang="ts">
	import type ButtonProps from '$lib/components/props/components/ButtonProps';
	import getButtonTypeClass from './utils/getButtonTypeClass';

	export let props: ButtonProps;
	export let extraClasses: string = '';
</script>

<button
	type="submit"
	id={props.id}
	data-testid={props.id}
	class="btn {getButtonTypeClass(props.type)} {extraClasses}">{props.label}</button
>
