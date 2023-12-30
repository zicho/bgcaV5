<script lang="ts">
	import '$lib/css/app.css';
	import type { PageData } from './(protected)/$types';
	import { getFlash } from 'sveltekit-flash-message/client';
	import { page } from '$app/stores';
	import { beforeNavigate } from '$app/navigation';
	import Navbar from '$lib/components/ui/Navbar.svelte';
	import BasePageLayout from '$lib/components/layout/BasePageLayout.svelte';

	export let data: PageData;

	$: ({ user, notificationCount } = data);

	const flash = getFlash(page);

	beforeNavigate((nav) => {
		if ($flash && nav.from?.url.toString() !== nav.to?.url.toString()) {
			$flash = undefined;
		}
	});
</script>

<svelte:head>
	<title>BGCA</title>
</svelte:head>

<Navbar {user} />

<div class="flex flex-col min-h-[calc(100vh-var(--navbar-height)-var(--footer-height))]">
	<slot />
</div>

<footer class="footer items-center p-4 bg-neutral text-neutral-content sticky bottom-0">
	<div class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
		<a href="/rules">Rules</a> |
		<a href="/contact">Contact</a> |
		<a href="/about">About</a>
	</div>
</footer>

<style>
	a:hover {
		color: unset !important;
	}
</style>
