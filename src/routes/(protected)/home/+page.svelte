<script lang="ts">
	import BasePageLayout from '$lib/components/layout/BasePageLayout.svelte';
	import type { PageData } from './$types';
	
	export let data: PageData;
</script>

<BasePageLayout>
	<h1 data-testid="frontpage-header">Welcome {data.user.username}</h1>
</BasePageLayout>
