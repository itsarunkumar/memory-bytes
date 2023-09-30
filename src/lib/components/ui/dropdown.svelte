<script>
	import { onMount, onDestroy } from 'svelte';
	let isOpen = false;

	const toggleDropdown = () => {
		isOpen = !isOpen;
	};

	function closeDropdown(event) {
		if (isOpen && !event.target.closest('.dropdown')) {
			isOpen = false;
		}
	}

	onMount(() => {
		// Listen for click events on the document to close the dropdown when clicking outside
		document.addEventListener('click', closeDropdown);
	});

	onDestroy(() => {
		// Clean up the event listener when the component is destroyed
		document.removeEventListener('click', closeDropdown);
	});
</script>

<button on:click={toggleDropdown} class="dropdown-toggle"> Toggle Dropdown </button>

{#if isOpen}
	<div class="dropdown">
		<!-- Dropdown content goes here -->
		<ul>
			<li><a href="#">Item 1</a></li>
			<li><a href="#">Item 2</a></li>
			<li><a href="#">Item 3</a></li>
		</ul>
	</div>
{/if}

<style>
	/* Add your CSS styles for the dropdown here */
	.dropdown {
		display: block;
		position: absolute;
		top: 100%;
		left: 0;
		background-color: white;
		border: 1px solid #ccc;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.dropdown ul {
		list-style: none;
		padding: 0;
	}

	.dropdown li {
		padding: 8px 16px;
	}

	.dropdown-toggle {
		cursor: pointer;
	}
</style>
