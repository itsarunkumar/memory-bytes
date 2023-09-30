<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex flex-col justify-center items-center w-full min-h-[calc(100vh-6rem)]">
	<h1 class="capitalize text-3xl">{data.user.name}</h1>
	<form method="post" action="?/logout" use:enhance class="px-10 py-5">
		<button type="submit" value="Sign out" class="px-4 py-2 bg-slate-800 text-slate-50 rounded-sm"
			>Logout</button
		>
	</form>
</div>
