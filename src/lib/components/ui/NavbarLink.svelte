<script lang="ts">
	import type { INavbarLink } from '$lib/interfaces/components/INavbarLink';
	export let props: INavbarLink;
	export let extraClasses: string = '';
</script>

<li class="flex justify-start {extraClasses}" id={props.id} data-testid={props.id}>
	<a
		href={props.url}
		aria-label={props.aria}
		class="lg:hover:text-neutral-content flex items-center"
	>
		{props.displayText}
	</a>
</li>

<style>
	a {
		color: inherit !important;
	}

	a:hover {
		color: inherit !important;
	}
</style>
