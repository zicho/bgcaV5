<script lang="ts">
	import LinkButton from '$lib/components/LinkButton.svelte';
	import BasePageLayout from '$lib/components/layout/BasePageLayout.svelte';
	import TabBar from '$lib/components/layout/TabBar.svelte';
	import type LinkButtonProps from '$lib/components/props/components/LinkButtonProps';
	import type TabBarProps from '$lib/components/props/components/TabBarProps';
	import PageHeaderToolbar from '$lib/components/ui/PageHeaderToolbar.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { requests } = data;

	const tabBarProps: TabBarProps = {
		tabs: [
			{
				displayName: 'Friends',
				href: "/friends"
			},
			{
				displayName: 'Pending',
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
</script>

<BasePageLayout>
	<PageHeaderToolbar title="Pending requests" subheader="View and manage requests sent and received"></PageHeaderToolbar>
	
	<hr class="py-4" />

	<TabBar props={tabBarProps} />

	<div class="prose">
		<h3>Please note</h3>
		If you deny a friend request, the sender will not be notified.
		It will simply be seen as "pending" from their view until they choose to cancel it themselves.
		If a user cancels their friend request after you denied it, any requests sent to them will show up as new.
		Removing a friend will not notify them, but you will be removed from their friend list.
	</div>

	{#if !requests.length}
		<div class="text-center font-bold mt-8">You have no pending requests.</div>
	{:else}
		<div class="overflow-x-auto">
			<table class="table">
				<!-- head -->
				<thead>
					<tr>
						<th>
							<label>
								<input type="checkbox" class="checkbox" />
							</label>
						</th>
						<th>Name</th>
						<!-- <th>Status</th> -->
						<th>Friend since</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{#each requests as user}
						<tr>
							<th>
								<label>
									<input type="checkbox" class="checkbox" />
								</label>
							</th>
							<td>
								<div class="flex items-center gap-3">
									<div class="avatar">
										<div class="mask w-12 h-12">
											<img
												src="https://api.dicebear.com/7.x/identicon/png?seed={user.name}"
												alt="Avatar Tailwind CSS Component"
											/>
										</div>
									</div>
									<div>
										<div class="font-bold">{user.name}</div>
									</div>
								</div>
							</td>
							<!-- <td>
							<div class="badge {friend.relationshipStatus === "PENDING" ? "badge-warning" : "badge-success"} p-6">
								{friend.relationshipStatus}
							</div>
						</td> -->
							<td>{user.friendsSince ? user.friendsSince : '-'}</td>
							<th>
								<LinkButton props={renderProps(user.name)} />
							</th>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</BasePageLayout>
