<script lang="ts">
	import type { ITextInput } from '$lib/components/interfaces/components/ITextInput';

	export let props: ITextInput;
	export let extraClasses: string = '';
</script>

<div class="form-control {extraClasses}">
	<label class="label" for={props.name}>
		<span class:text-error={props.hasError || props.errorMessage} class="label-text font-semibold">{props.label}</span>
		{#if props.errorMessage}
			<span id="{`${props.name}-error-message`}" data-testid={`${props.name}-error-message`} class="label-text-alt text-error">{props.errorMessage}</span>
		{/if}
	</label>
	<input
		id={props.name}
		name={props.name}
		value={props.value}
		data-testid={props.name}
		type={props.type || 'text'}
		placeholder={props.placeholder}
		aria-label={props.placeholder}
		class="input input-bordered w-full"
		class:input-error={props.hasError || props.errorMessage}
		aria-invalid={props.hasError || props.errorMessage != undefined}
		required={props.required}
	/>
</div>

<style>
	.label {
		padding-left: 0 !important;
	}

	.input-error::placeholder {
		@apply text-error;
	}
</style>
