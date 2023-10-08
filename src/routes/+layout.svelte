<script lang="ts">
	import '$lib/css/app.css';
</script>

<div class="navbar bg-neutral text-neutral-content">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost normal-case text-xl">daisyUI</a>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal px-1">
			<li><a data-testid="layout-login-link" href="/login">Log in</a></li>
			<li><a data-testid="layout-register-link" href="/register">Register</a></li>
		</ul>
	</div>
</div>

<slot />

<style>
	a:hover {
		color: unset !important;
	}
</style>
