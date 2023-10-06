<script lang="ts">
	import ThemeSwitch from './theme-switch.svelte';
	import { page } from '$app/stores';
	import { PowerOffIcon, User } from 'lucide-svelte';
	import type { SvelteComponent } from 'svelte';
</script>

<nav class="w-full flex justify-around items-center h-16 border-b">
	<h1>
		<a href="/">Bytes</a>
	</h1>
	<div class="flex gap-2 items-center">
		{#if $page.data.loggedIn}
			<a href="/profile" class="hover:underline transition-all">Profile</a>
			<a href="/folder">Bytes</a>
			<a href="/daily">Daily</a>
		{:else}
			<a href="/login">Login</a>
			<a href="/signup">Signup</a>
		{/if}

		<ThemeSwitch />
	</div>
</nav>
