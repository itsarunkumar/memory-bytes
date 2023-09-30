<script lang="ts">
	import { enhance } from '$app/forms';
	import { RotateCcw } from 'lucide-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: loading = false;
</script>

<div class="flex flex-col justify-center items-center w-full min-h-[calc(100vh-6rem)]">
	<h1 class="capitalize text-3xl">{data.user.name}</h1>
	<form method="post" action="?/logout" use:enhance class="px-10 py-5">
		<button
			class="bg-slate-900 text-slate-100 rounded-sm px-4 py-2 cursor-pointer flex gap-2 items-center"
			>{#if loading}
				logging out... <RotateCcw class="w-4 h-4 animate-spin" />
			{:else}
				Logout
			{/if}</button
		>
	</form>
</div>
