<script lang="ts">
	import BasePageLayout from '$lib/components/layout/BasePageLayout.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<BasePageLayout>
    <div class="grid grid-flow-col auto-cols-max md:auto-cols-min">		<div>
			<div class="card w-full bg-base-100 border shadow">
				<div class="card-body">
					<h2 class="card-title">Upcoming events</h2>
					<p>If a dog chews shoes whose shoes does he choose?</p>
				</div>
			</div>
		</div>
        <div>
			<div class="card w-full bg-base-100 border shadow">
				<div class="card-body">
					<h2 class="card-title">Upcoming events</h2>
					<p>If a dog chews shoes whose shoes does he choose?</p>
				</div>
			</div>
		</div>
		<div>
			<div class="card w-full bg-base-100 border shadow">
				<div class="card-body">
					<h2 class="card-title">Upcoming events</h2>
					<p>If a dog chews shoes whose shoes does he choose?</p>
				</div>
			</div>
		</div>
		<div>
			<div class="card w-full bg-base-100 border shadow">
				<div class="card-body">
					<h2 class="card-title">Upcoming events</h2>
					<p>If a dog chews shoes whose shoes does he choose?</p>
				</div>
			</div>
		</div>
	</div>
</BasePageLayout>
