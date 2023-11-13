<script lang="ts">
	import NavbarLink from '$lib/components/ui/NavbarLink.svelte';
	import generateNavbarLinks from '$lib/data/layout/navbarLinks';
	import type { User } from 'lucia';
	import MenuIcon from 'virtual:icons/lucide/menu';

	export let user: User;

	let open: boolean;

	// reactive to changes in user state
	$: navbarLinks = generateNavbarLinks(user);

	$: menuDataAuthenticated = navbarLinks.filter((item) => item.authOnly);
	$: menuDataNotAuthenticated = navbarLinks.filter((item) => !item.authOnly);
</script>

<div class="navbar bg-neutral text-neutral-content sticky top-0">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost normal-case text-xl">daisyUI</a>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal px-1 hidden md:flex">
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
		<label for="mobile-menu" class="flex md:hidden hover:cursor-pointer"
			><MenuIcon class="mr-4 " /></label
		>
	</div>
</div>

<input type="checkbox" id="mobile-menu" class="modal-toggle" bind:checked={open} />
<div class="modal md:hidden">
	<div class="modal-box">
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<ul class="space-y-8" on:click={() => (open = false)}>
			{#if user}
				{#each menuDataAuthenticated as link}
					<NavbarLink props={{ ...link, id: `${link.id}-modal` }} />
				{/each}
			{:else}
				{#each menuDataNotAuthenticated as link}
					<NavbarLink props={{ ...link, id: `${link.id}-modal` }} />
				{/each}
			{/if}
		</ul>
	</div>
</div>
