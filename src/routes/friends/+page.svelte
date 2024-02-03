<script lang="ts">
	import LinkButton from '$lib/components/LinkButton.svelte';
	import BasePageLayout from '$lib/components/layout/BasePageLayout.svelte';
	import TabBar from '$lib/components/layout/TabBar.svelte';
	import type LinkButtonProps from '$lib/components/props/components/LinkButtonProps';
	import type TabBarProps from '$lib/components/props/components/TabBarProps';
	import PageHeaderToolbar from '$lib/components/ui/PageHeaderToolbar.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ friends } = data);

	$: allSelected = friends.every((x) => x.selected);

	const tabBarProps: TabBarProps = {
		tabs: [
			{
				displayName: 'Friends'
			},
			{
				displayName: 'Pending',
				href: '/friends/pending'
			}
		]
	};

	function renderProps(username: string): LinkButtonProps {
		return {
			id: `go-to-${username}-profile-link-btn`,
			href: `/profile/${username}`,
			label: 'Profile'
		};
	}

	function toggleAllSelected(event: Event) {
		friends = friends.map((friend) => ({
			...friend,
			selected: (event.target as HTMLInputElement).checked
		}));
	}
</script>

<BasePageLayout>
	<PageHeaderToolbar title="Friends" subheader="View and manage friend list"></PageHeaderToolbar>

	<hr class="py-4" />

	<TabBar props={tabBarProps} />

	{#if !friends.length}
		<div class="text-center font-bold mt-8">You don't have any users on your friend list yet.</div>
	{:else}
		<div class="overflow-x-auto">
			<table class="table">
				<!-- head -->
				<thead>
					<tr>
						<th>
							<label>
								<input type="checkbox" class="checkbox" on:change={toggleAllSelected} />
							</label>
						</th>
						<th>Name</th>
						<!-- <th>Status</th> -->
						<th>Friend since</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{#each friends as friend}
						<tr>
							<th>
								<label>
									<input type="checkbox" class="checkbox" bind:checked={friend.selected} />
								</label>
							</th>
							<td>
								<div class="flex items-center gap-3">
									<div class="avatar">
										<div class="mask w-12 h-12">
											<img
												src="https://api.dicebear.com/7.x/identicon/png?seed={friend.name}"
												alt="Avatar Tailwind CSS Component"
											/>
										</div>
									</div>
									<div>
										<div class="font-bold">{friend.name}</div>
									</div>
								</div>
							</td>
							<!-- <td>
							<div class="badge {friend.relationshipStatus === "PENDING" ? "badge-warning" : "badge-success"} p-6">
								{friend.relationshipStatus}
							</div>
						</td> -->
							<td>{friend.friendsSince ? friend.friendsSince : '-'}</td>
							<th>
								<LinkButton props={renderProps(friend.name)} />
							</th>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</BasePageLayout>
