<script lang="ts">
	import { enhance } from '$app/forms';
	import { RotateCcw } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { animate } from 'motion';

	export let data: PageData;

	console.log(data);

	$: loading = false;
</script>

<div class="w-full min-h-[calc(100vh-6rem)] flex flex-col items-center justify-start">
	<h1 class="capitalize text-3xl">Name: {data.userDetails?.name}</h1>
	<span>username: {data.userDetails?.username}</span>
	<div class="flex flex-col justify-center items-center w-full">
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
</div>
