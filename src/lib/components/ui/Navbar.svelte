<script lang="ts">
	import NavbarLink from '$lib/components/ui/NavbarLink.svelte';
	import type { INavbarLink } from '$lib/interfaces/components/INavbarLink';
	import type { User } from 'lucia';

	export let user: User;

	let open: boolean;

	// reactive to changes in user state
	$: navbarLinks = [
		{
			url: `/profile/${user?.username}`,
			displayText: user?.username,
			id: 'navbar-link-profile',
			aria: 'View and edit user profile',
			icon: 'fa-user',
			authOnly: true
		},

		{
			url: `/messages`,
			displayText: 'Messages',
			id: 'navbar-link-messages',
			aria: 'View and send messages',
			icon: 'fa-message',
			authOnly: true
		},
		{
			url: '/games',
			displayText: 'Games',
			id: 'navbar-link-games',
			aria: 'Find and organize games',
			icon: 'fa-dice',
			authOnly: true
		},
		{
			url: '/events',
			displayText: 'Events',
			id: 'navbar-link-events',
			aria: 'Find and organize events',
			icon: 'fa-calendar-alt',
			authOnly: true
		},
		{
			url: '/logout',
			displayText: 'Sign Out',
			id: 'navbar-link-signout',
			aria: 'Sign out',
			icon: 'fa-sign-out',
			authOnly: true
		},
		{
			url: '/login',
			displayText: 'Login',
			id: 'navbar-link-login',
			aria: 'Log in',
			icon: 'fa-sign-in',
			authOnly: false
		},
		{
			url: '/register',
			displayText: 'Register',
			id: 'navbar-link-register',
			aria: 'Register a new user',
			icon: 'fa-user-plus',
			authOnly: false
		}
	] satisfies INavbarLink[];

	$: menuDataAuthenticated = navbarLinks.filter((item) => item.authOnly);
	$: menuDataNotAuthenticated = navbarLinks.filter((item) => !item.authOnly);

	const closeMenu = (event: Event) => (open = false);
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
