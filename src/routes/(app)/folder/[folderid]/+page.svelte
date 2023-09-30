<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { clickOutsideAction } from '$lib/helpers/clickoutside';
	import { Feather, MoreVertical, PenLine, SendHorizonal, Trash } from 'lucide-svelte';
	import { formatDistanceToNow } from 'date-fns';

	export let data: PageData;
	let openOptions: Record<string, boolean> = {};
</script>

<div class="w-full flex justify-around items-center my-5">
	<h1 class="text-3xl capitalize">{$page.data.folder.name}</h1>
	<a
		href="/editor?folderid={$page.params.folderid}"
		class="px-5 py-2 rounded bg-primary text-primary-foreground"
	>
		new byte</a
	>
</div>

<div class="w-full flex items-center justify-center flex-col gap-5 max-sm:px-5">
	{#each data.posts as post (post.id)}
		<div
			class="w-96 max-sm:w-full min-h-[50px] px-5 py-2 rounded-md border shadow-lg flex items-center justify-between"
		>
			<div class="flex flex-col justify-start items-start">
				<h1 class="text-lg capitalize">
					<a
						href="/editor?byte={post.id}&byte=read&byte={post.folderId}"
						class="flex gap-2 justify-between items-center text-lg"
						>{post.title} <Feather class="w-4 h-4" />
					</a>
				</h1>
				<span class="text-xs text-muted-foreground"
					>updated at {formatDistanceToNow(new Date(post.updated_at), { addSuffix: true })}</span
				>
			</div>
			<div class="relative" use:clickOutsideAction={() => (openOptions[post.id] = false)}>
				<button
					on:click={() => (openOptions[post.id] = !openOptions[post.id])}
					class="flex items-center"
				>
					<MoreVertical class="w-5 h-5" />
				</button>

				{#if openOptions[post.id]}
					<div
						class="absolute px-5 py-2 z-10 bg-primary-foreground text-primary shadow-sm rounded border"
					>
						<a
							href="/editor?byte={post.id}&byte=read&byte={post.folderId}"
							class="flex gap-2 justify-between items-center text-lg"
							>View <SendHorizonal class="w-4 h-4" />
						</a>
						<a
							href="/editor?byte={post.id}&byte=edit&byte={post.folderId}"
							class="flex gap-2 justify-between items-center text-lg"
						>
							Edit<PenLine class="w-4 h-4" /></a
						>
						<button class="flex gap-2 justify-between items-center text-lg">
							Delete<Trash class="w-4 h-4" />
						</button>
					</div>
				{/if}
			</div>
		</div>
	{/each}
</div>

<style>
	@media (max-width: 640px) {
		/* Adjust the dropdown styles for smaller screens */
		.absolute {
			right: 0;
		}
	}
</style>
