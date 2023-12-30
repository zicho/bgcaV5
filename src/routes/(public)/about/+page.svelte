<script lang="ts">
	import BasePageLayout from '$lib/components/layout/BasePageLayout.svelte';
	import LinkCard from '$lib/components/layout/LinkCard.svelte';
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<BasePageLayout>
	<section class="prose max-w-none">
		<section
			class="mb-16 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8"
		>
			<article>
				<h2 class="mt-0">About</h2>
				<p class="m-0">
					This web page/application is a non-profit and non-commercial project built and maintained
					by <a href="https://github.com/zicho">zicho (Github)</a>.
				</p>

				<p>
					<strong>It has been designed with noscript users in mind</strong>. There are some features
					(like realtime updates and client side navigation) which are only available to JavaScript
					users. However, all core features should work regardless of if you are a script user or
					not.
				</p>
				<p>
					<i>This is not only for performance and/or server side fallbacks</i>, it also to not
					exclude those who (for any reason) choose to browse scriptfree. Also it shows what a
					modern web app can accomplish without necessarily resorting to using JS for core features
					when it might not be necessary.
				</p>
				<p>
					If you have any issues with the site please see
					<a href="/contact">contact info page</a> for information on how to report it.
				</p>
			</article>
			<article>
				<h2 class="mt-0">Thanks to</h2>

				<a class="font-semibold" href="https://boardgamegeek.com/" target="_blank">BoardGameGeek</a
				>, for maintaining an excellent website which hosts most of the data used here.<br />
				<a class="font-semibold" href="https://github.com/ervwalter" target="_blank">ervwalter</a>,
				creator of the
				<a href="https://github.com/ervwalter/bgg-json" target="_blank">BGG JSON API</a><br />
				<a class="font-semibold" href="https://www.youtube.com/@huntabyte" target="_blank"
					>Huntabyte</a
				>, for making excellent SvelteKit content, without which this website would probably not
				have existed at all.<br />
				<a class="font-semibold" href="https://github.com/ciscoheat/" target="_blank">Ciscoheat</a>,
				for the awesome
				<a href="https://github.com/ciscoheat/sveltekit-superforms" target="_blank">Superforms</a>
				and
				<a href="https://github.com/ciscoheat/sveltekit-flash-message" target="_blank"
					>Flash Message</a
				>
				libraries.<br />
			</article>
		</section>

		<hr class="my-8" />

		<h2>Tech stack</h2>

		<p>
			These are some of the tools used to power this website. Much props to their developers and
			maintainers!
		</p>
	</section>

	<section
		class="mt-8 mb-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
	>
		<LinkCard
			title="SvelteKit"
			imgUrl="https://cdn.hashnode.com/res/hashnode/image/upload/v1619358925225/50e2XssdE.png"
			imgAlt="sveltekit logo"
			url="https://kit.svelte.dev/"
		>
			<p>This application is powered by the excellent SvelteKit framework.</p>
		</LinkCard>

		<LinkCard
			title="DaisyUI"
			imgUrl="https://www.saashub.com/images/app/service_logos/177/5calsa790aop/large.png?1677920086"
			imgAlt="daisyui logo"
			url="https://daisyui.com/"
		>
			<p>
				The layout of this website is courtesy of DaisyUI, the awesome TailwindCSS component
				framework.
			</p>
		</LinkCard>

		<LinkCard
			title="Tailwind"
			imgUrl="https://avatars.githubusercontent.com/u/67109815?s=280&v=4"
			imgAlt="tailwind logo"
			url="https://tailwindcss.com/"
		>
			<p>
				Tailwind CSS is a utility-first CSS framework for rapidly building modern websites without
				ever leaving your HTML.
			</p>
		</LinkCard>

		<LinkCard
			title="Supabase"
			imgUrl="https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/001/299/square_480/supabase-logo-icon_1.png"
			imgAlt="supabase logo"
			url="https://supabase.com/"
		>
			<p>
				Database and realtime functionality handled by Supabase, an open source Firebase
				alternative.
			</p>
		</LinkCard>
		<LinkCard
			title="Lucia"
			imgUrl="https://lucia-auth.com/logo.svg"
			imgAlt="lucia logo"
			url="https://lucia-auth.com/"
		>
			<p>
				Lucia is a simple and flexible user and session management library that provides an
				abstraction layer between your app and your database.
			</p>
		</LinkCard>
		<LinkCard
			title="Drizzle ORM"
			imgUrl="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.fiSV5UApVkxBw4eg0XQMIQAAAA%26pid%3DApi&f=1&ipt=4a9d43aad09604e16c1e790574df299e32e3d0c1e1a9725441af92721c98e24c&ipo=images"
			imgAlt="drizzle logo"
			url="https://orm.drizzle.team/"
		>
			<p>
				Drizzle ORM is a lightweight and performant TypeScript ORM with developer experience in
				mind.
			</p>
		</LinkCard>
	</section>
</BasePageLayout>
