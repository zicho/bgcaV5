<script lang="ts">
	import { page } from '$app/stores';
	import BasePageLayout from '$lib/components/layout/BasePageLayout.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<BasePageLayout>
	<h1>{data.isProfileYours ? 'Your profile' : `${$page.params.username}'s profile`}</h1>
</BasePageLayout>
