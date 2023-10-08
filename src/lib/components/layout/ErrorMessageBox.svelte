<script lang="ts">
	import type { IErrorMessageBox } from '$lib/interfaces/layout/IErrorMessageBox';

	export let props: IErrorMessageBox;
</script>

{#if props.show}
	<div class="card w-96 shadow-xl p-8 bg-error mt-4" id={props.id} data-testid={props.id}>
		<span class="text-error-content text-center min-h-fit">{props.message}</span>
	</div>
{/if}
