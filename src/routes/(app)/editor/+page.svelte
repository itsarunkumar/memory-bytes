<script lang="ts">
	import Editor from '$lib/components/editor.svelte';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { CheckCheck, ChevronsLeft, RotateCcw } from 'lucide-svelte';

	export let data: PageData;

	let editor: Editor;

	$: saving = false;

	async function saveByte(event: { detail: { outputData: any; title: any } }) {
		const { outputData, title } = event.detail;

		saving = true;

		const data = await fetch('/api/byte', {
			method: 'POST',
			body: JSON.stringify({
				content: outputData,
				title: title,
				folder: $page.url.searchParams.get('folderid'),
				userId: $page.data.user.userId
			})
		});

		if (data.ok) {
			goto(`/folder/${$page.url.searchParams.get('folderid')}`);

			saving = false;
		}
	}

	async function updateByte(event: { detail: { outputData: any; title: any } }) {
		const { outputData, title } = event.detail;

		saving = true;

		const updateBytesRes = await fetch('/api/byte', {
			method: 'PUT',
			body: JSON.stringify({
				title: title,
				content: outputData,
				id: data.id
			})
		});

		if (updateBytesRes.ok) {
			saving = false;
		}
	}
</script>

<div class="w-full flex items-center justify-around my-5">
	{#if data.mode === 'read' || data.mode === 'edit'}
		<a href="/folder/{data.folder}" class="flex gap-2 items-center"> <ChevronsLeft /> go back</a>
	{:else}
		<a href="/folder/{$page.url.searchParams.get('folderid')}" class="flex gap-2 items-center">
			<ChevronsLeft /> go back</a
		>
	{/if}

	{#if data.mode !== 'read'}
		<div class="flex flex-col gap-1 items-center">
			<button
				on:click={() => editor.saveNotes()}
				class="px-5 py-2 rounded bg-primary text-primary-foreground flex items-center gap-2 flex-col"
				>save
			</button>
			<span class="text-xs p-0 text-muted-foreground flex gap-1 items-center"
				>{saving ? 'Saving...' : 'Saved'}
				{#if saving}
					<RotateCcw class="w-4 h-4 animate-spin" />
				{:else}
					<CheckCheck class="w-4 h-4" />
				{/if}
			</span>
		</div>
	{/if}
</div>

{#if data.mode === 'read'}
	<svelte:component this={Editor} data={data.byte?.content} title={data.byte?.title} read={true} />
{:else if data.mode === 'edit'}
	<svelte:component
		this={Editor}
		bind:this={editor}
		on:save={updateByte}
		data={data.byte?.content}
		title={data.byte?.title}
		read={false}
	/>
{:else}
	<svelte:component
		this={Editor}
		bind:this={editor}
		on:save={saveByte}
		data={data.byte?.content}
		title={data.byte?.title}
		read={false}
	/>
{/if}
