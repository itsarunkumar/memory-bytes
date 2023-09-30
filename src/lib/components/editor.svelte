<script lang="ts">
	//@ts-nocheck
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';

	import EditorJS from '@editorjs/editorjs';
	import Header from '@editorjs/header';
	import List from '@editorjs/list';

	// backend needed
	import SimpleImage from '@editorjs/simple-image';

	// editor prop
	export let data;
	export let read = false;

	const dispatch = createEventDispatcher();

	let editor: EditorJS;

	onMount(async () => {
		editor = new EditorJS({
			holder: 'editorjs',
			placeholder: 'Whats on your mind buddyyy...',
			tools: {
				header: Header,
				list: List,
				image: SimpleImage
			},
			data: data,
			readOnly: read,
			onReady: () => {
				editor.notifier.show({
					message: 'Editor is ready!'
				});
			},
			onChange: async () => {}
		});
	});

	onDestroy(() => {
		editor.destroy();
	});

	export let title = '';

	export async function saveNotes() {
		const outputData = await editor.save();
		dispatch('save', { outputData, title: title });
	}

	export function clear() {
		editor.clear();
		title = '';
	}

	export function toggleReadOnly(state: boolean) {
		editor.readOnly.toggle(state);
	}
</script>

<!-- main editor components -->

<div class="flex flex-col w-full">
	<input
		type="text"
		name="title"
		id="title"
		placeholder="Enter a title for byte"
		bind:value={title}
		class="flex self-center bg-background dark:bg-background dark:placeholder:text-slate-100 my-5 text-3xl border-none outline-none active:outline-none active:border-none"
		required
		readonly={read}
	/>

	<div id="editorjs" class="min-h-[500px] w-full" />
	<div
		class=" mx-auto lg:flex hidden bg-slate-100 dark:bg-slate-700 dark:text-slate-300 px-4 py-2 rounded-md"
	>
		press <code class="px-2">TAB</code> to open options
	</div>
</div>
