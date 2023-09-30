<script>
	import { createEventDispatcher } from 'svelte';
	import { onMount, onDestroy } from 'svelte';
	import { fade, fly, slide } from 'svelte/transition';

	export let isOpen = false;

	const dispatch = createEventDispatcher();

	function closeModal() {
		isOpen = false;
		dispatch('close');
	}
</script>

{#if isOpen}
	<div class="fixed top-0 left-0 flex justify-center items-center {$$props.class}  ">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="fixed top-0 left-0 w-full h-full bg-black opacity-50" on:click={closeModal} />
		<div
			transition:fly={{ y: 200, duration: 300 }}
			class="bg-primary-foreground backdrop-blur-md px-5 py-2 rounded-md shadow-sm z-50"
		>
			<slot />
		</div>
	</div>
{/if}

<style>
	.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.modal-content {
		background-color: white;
		padding: 20px;
		border-radius: 4px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		z-index: 9999;
	}

	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
	}
</style>
