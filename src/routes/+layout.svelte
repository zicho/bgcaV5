<script lang="ts">
	import '$lib/css/app.css';
	import type { PageData } from "./(protected)/$types";
	import { getFlash } from "sveltekit-flash-message/client";
	import { page } from "$app/stores";
	import { beforeNavigate } from "$app/navigation";
	import Navbar from "$lib/components/ui/Navbar.svelte";

	export let data: PageData;

	$: ({ user, notificationCount } = data);

	const flash = getFlash(page);

	beforeNavigate((nav) => {
		if ($flash && nav.from?.url.toString() !== nav.to?.url.toString()) {
			$flash = undefined;
		}
	});
</script>

<Navbar {user} />

<slot />

<style>
	a:hover {
		color: unset !important;
	}
</style>
