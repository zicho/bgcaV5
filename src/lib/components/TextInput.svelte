<script lang="ts">
	import type { ITextInput } from '$lib/interfaces/components/ITextInput';

	export let props: ITextInput;
	export let extraClasses: string = '';
</script>

<div class="form-control w-full max-w-xs {extraClasses}">
	<label class="label " for={props.name}>
		<span class="label-text font-semibold">{props.label}</span>
		{#if props.hasError && props.errorMessage}
			<span class="label-text-alt text-error">{props.errorMessage}</span>
		{/if}
	</label>
	<input
		id={props.name}
		name={props.name}
		data-testid={props.name} 
		type={props.type || 'text'}
		placeholder={props.placeholder}
		class="input input-bordered w-full max-w-xs input-error "
		class:input-error={props.hasError}
	/>
</div>

<style>
	.label {
		padding-left: 0 !important;
	}

	.input-error::placeholder  {
		@apply text-error;
	}
</style>
