<script lang="ts">
	import type { PageData } from './$types';
	import Modal from '$lib/components/ui/modal.svelte';
	import { enhance } from '$app/forms';
	import { fade, fly, slide } from 'svelte/transition';
	import { Files, FolderInput, FolderOpen, Library, RotateCcw, Trash } from 'lucide-svelte';

	export let data: PageData;

	let showModal = false;

	$: loading = false;

	function toggleModal() {
		showModal = !showModal;
	}
</script>

<!-- TODO: add a keyboard shortcut to open the modal -->

<!-- <svelte:window
	on:keydown={(e) => {
		if (e.key === 'F' || 'f') {
			toggleModal();
		}
		if (e.key === 'Escape') {
			showModal = false;
		} else {
			return;
		}
	}}
/> -->

<Modal isOpen={showModal} on:close={toggleModal} class="w-full h-full">
	<h2 class="text-lg font-semibold my-2">New Folder</h2>

	<form
		action="?/createFolder"
		method="post"
		use:enhance={() => {
			return async ({ update }) => {
				loading = true;
				await update();
				loading = false;
				toggleModal();
			};
		}}
		class="flex flex-col gap-2"
	>
		<input
			type="text"
			name="foldername"
			id="foldername"
			placeholder="enter folder name"
			required
			class="outline-none border rounded-md border-slate-800 dark:border-slate-500 border-opacity-40 placeholder:bg-primary-foreground bg-primary-foreground px-5 py-2"
		/>
		<!-- <input
			type="text"
			name="tag"
			id="tag"
			placeholder="add tag(optional)"
			class="outline-none border-b border-slate-800 dark:border-slate-500 border-opacity-40 placeholder:bg-primary-foreground bg-primary-foreground px-5 py-2"
		/> -->
		<div class="flex gap-5 justify-end items-center">
			<button on:click={toggleModal} class="px-4 py-2 text-red-500">Cancel</button>
			<button type="submit" class="px-4 py-2 text-green-500">
				{#if loading}
					<RotateCcw class="w-4 h-4 animate-spin" />
				{:else}
					Create
				{/if}
			</button>
		</div>
	</form>
</Modal>

<div class="flex justify-around items-center my-5">
	<h1 class="text-3xl flex gap-2 items-center">Folders <Library /></h1>
	<button
		on:click={toggleModal}
		on:keydown={(e) => {
			console.log(e.key);
			if (e.key === 'Escape') {
				toggleModal();
			}
		}}
		class="px-3 py-2 rounded bg-primary text-primary-foreground flex gap-2 items-center"
		>new folder <FolderInput class="w-4 h-4" />
	</button>
</div>

<!-- folders -->

<div class="w-full flex items-center justify-center flex-wrap gap-5 my-10">
	{#if data.folders.length === 0}
		<p>No folders. Create a folder</p>
	{/if}

	{#each data.folders as folder (folder.id)}
		<div
			class="bg-primary-foreground p-2 border rounded-md shadow-lg w-80 flex flex-col gap-2 items-center"
			out:fly
			in:slide
		>
			<h1 class="text-lg font-semibold px-2 py-0.5 flex self-start capitalize">{folder.name}</h1>
			<span class="text-muted-foreground text-sm px-2 py-1 flex self-start"
				><Files class="w-4 h-4" /> : {folder._count.posts}</span
			>
			<div class="flex gap-2 justify-between w-full items-center border-t">
				<a
					href="/folder/{folder.id}?name={folder.name}"
					class="px-5 py-2 text-center flex gap-2 items-center"
					>Open <FolderOpen class="w-4 h-4" />
				</a>
				<hr class="h-10 border bg-primary-foreground" />
				<form
					action="?/deleteFolder"
					method="post"
					class="text-red-500 px-5 py-2"
					use:enhance={() => {
						return async ({ update }) => {
							loading = true;
							await update();
							loading = false;
						};
					}}
				>
					<input type="text" name="id" id="id" value={folder.id} hidden />
					<button class="flex gap-2 items-center">
						Delete <Trash class="w-4 h-4" />
					</button>
				</form>
			</div>
		</div>
	{/each}
</div>
