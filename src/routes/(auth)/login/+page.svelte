<!-- routes/login/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import { LogIn, RotateCcw } from 'lucide-svelte';
	$: loading = false;
</script>

<h1>Sign in</h1>
<form
	method="post"
	use:enhance={() => {
		loading = true;
		return async ({ update }) => {
			await update();
			loading = false;
		};
	}}
>
	<div class="flex items-center flex-col">
		<label for="username"
			>Username
			<input name="username" id="username" placeholder="enter your username" />
		</label>

		<label for="password"
			>Password
			<input type="password" name="password" id="password" placeholder="enter your password" />
		</label>
	</div>
	<div class="flex gap-4 justify-center items-center py-5">
		<button
			class="bg-slate-900 text-slate-100 rounded-sm px-4 py-2 cursor-pointer flex gap-2 items-center"
			>{#if loading}
				logging in... <RotateCcw class="w-4 h-4 animate-spin" />
			{:else}
				Login
			{/if}</button
		>
		<a href="/signup" class="text-blue-500">create account</a>
	</div>
</form>

<style>
	label {
		@apply px-2 py-2 w-full flex justify-between items-center gap-2;
	}
	label input {
		@apply bg-slate-100 text-slate-900 text-lg px-4 py-2 outline-none border-b border-slate-900 border-opacity-25 rounded;
	}
</style>
