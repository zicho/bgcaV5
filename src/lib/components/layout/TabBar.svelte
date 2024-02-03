<script lang="ts">
	import type TabBarProps from "../props/components/TabBarProps";

	export let props: TabBarProps;
</script>

<div role="tablist" class="tabs tabs-lifted tabs-lg mb-8">
	{#each props.tabs as tab}
		{#if !tab.href}
			<span role="tab" class="tab tab-active">{tab.displayName}</span>
		{:else}
			<a role="tab" class="tab" href="{tab.href}">{tab.displayName}</a>
		{/if}
	{/each}
</div>
