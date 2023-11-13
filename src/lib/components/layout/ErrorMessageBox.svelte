<script lang="ts">
	import type { IErrorMessageBox } from '$lib/interfaces/layout/IErrorMessageBox';

	export let props: IErrorMessageBox;
	export let extraClasses: string ='';
</script>

{#if props.show}
	<div class="card shadow-xl p-8 bg-error w-full {extraClasses}" id={props.id} data-testid={props.id}>
		<span class="text-error-content text-center min-h-fit">{props.message}</span>
	</div>
{/if}
