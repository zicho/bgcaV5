<script lang="ts">
	export let title = '';
</script>

<article
	class="h-[calc(100vh-var(--navbar-height)-var(--footer-height))] md:h-auto card shadow-xl px-8 py-4 bg-base-100 w-full sm:w-full md:w-2/3 lg:w-1/3 xl:w-1/4"
>
	{#if title}
		<h1 class="text-2xl mb-4 mt-2 text-center">{title}</h1>
		<hr class="mb-4" />
	{/if}

	<slot />
</article>
