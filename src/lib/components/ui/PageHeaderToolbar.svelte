<script lang="ts">
	export let title: string | undefined;
	export let subheader: string | undefined = "";
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="w-full">
	<div class="flex flex-col xl:flex-row mb-8">
		<div class="prose prose-sm xl:mb-0 mb-4 max-w-none">
			<h1 class="m-0 p-0">{title}</h1>
			{#if subheader}
				<h2 class="p-0 m-0 font-extralight">{subheader}</h2>
			{/if}
		</div>
		<div class="xl:flex xl:flex-row ml-auto w-full xl:w-auto space-y-2 xl:space-y-0 xl:space-x-4">
			<slot />
		</div>
	</div>
</div>