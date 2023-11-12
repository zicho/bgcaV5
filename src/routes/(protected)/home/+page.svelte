<script lang="ts">
	import BasePageLayout from '$lib/components/layout/BasePageLayout.svelte';
	import type { PageData } from './$types';
	
	export let data: PageData;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<BasePageLayout>
	<h1 data-testid="frontpage-header">Welcome {data.user.username}</h1>
</BasePageLayout>
