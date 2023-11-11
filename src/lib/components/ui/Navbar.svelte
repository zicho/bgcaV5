<script lang="ts">
	import NavbarLink from '$lib/components/ui/NavbarLink.svelte';
	import generateNavbarLinks from '$lib/data/layout/navbarLinks';
	import type { User } from 'lucia';

	export let user: User;

	let open: boolean;

	// reactive to changes in user state
	$: navbarLinks = generateNavbarLinks(user);

	$: menuDataAuthenticated = navbarLinks.filter((item) => item.authOnly);
	$: menuDataNotAuthenticated = navbarLinks.filter((item) => !item.authOnly);
</script>

<div class="navbar bg-neutral text-neutral-content">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost normal-case text-xl">daisyUI</a>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal px-1">
			{#if user}
				{#each menuDataAuthenticated as link}
					<NavbarLink props={link} />
				{/each}
			{:else}
				{#each menuDataNotAuthenticated as link}
					<NavbarLink props={link} />
				{/each}
			{/if}
		</ul>
	</div>
</div>
