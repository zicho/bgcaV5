<script lang="ts">
	import BasePageLayout from '$lib/components/layout/BasePageLayout.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { latestUsers } = data;
</script>

<BasePageLayout>
	<div class="prose">
		<h1>Latest users:</h1>
		<div class="flex flex-col">
			{#each latestUsers as user}
				<a href="/profile/{user.username}">{user.username}</a>
			{/each}
		</div>
	</div>
</BasePageLayout>
