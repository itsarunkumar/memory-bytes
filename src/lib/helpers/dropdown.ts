/**
 * TODO: Implement this in a way that it separately opens and closes the dropdown
 */

// import { tick } from 'svelte';
// import { writable } from 'svelte/store';

// interface DropdownActions {
// 	isOpen: import('svelte/store').Writable<boolean>;
// 	dropdownTrigger: (node: HTMLElement) => { destroy: () => void };
// 	closeDropdown: () => void;
// }

// export function dropdown(): DropdownActions {
// 	const isOpen = writable({isopen:false , id:''});

// 	function closeDropdown() {
// 		isOpen.set(false);
// 	}

// 	function handleClickOutside(event: MouseEvent, containerId: string) {
// 		const dropdownContainer = document.getElementById(containerId);
// 		if (dropdownContainer && !dropdownContainer.contains(event.target as Node)) {
// 			closeDropdown();
// 		}
// 	}

// 	function handleKeyDown(event: KeyboardEvent, containerId: string) {
// 		if (event.key === 'Escape') {
// 			closeDropdown();
// 		}
// 	}

// 	function dropdownTrigger(node: HTMLElement) {
// 		// Generate a unique ID for the dropdown container
// 		const containerId = `dropdown-container-${Math.random().toString(36).substr(2, 9)}`;

// 		async function toggleDropdown(id: string) {
// 			await tick();
// 			console.log(node.dataset.dropdownContainerId);
// 			if (id === node.dataset.dropdownContainerId) {
// 				isOpen.update(($isOpen) => !$isOpen);
// 			}
// 		}

// 		// Set the ID to the dropdown container
// 		node.setAttribute('data-dropdown-container-id', containerId); // Use data- attribute

// 		node.addEventListener('click', (event) => {
// 			toggleDropdown(node.dataset.dropdownContainerId as string);
// 			event.stopPropagation();
// 		});

// 		document.addEventListener('click', (event) => handleClickOutside(event, containerId));
// 		document.addEventListener('keydown', (event) => handleKeyDown(event, containerId));

// 		return {
// 			destroy() {
// 				node.removeEventListener('click', (event) => {
// 					// Corrected this line
// 					toggleDropdown(node.dataset.dropdownContainerId as string);
// 					event.stopPropagation();
// 				});
// 				document.removeEventListener('click', (event) => handleClickOutside(event, containerId));
// 				document.removeEventListener('keydown', (event) => handleKeyDown(event, containerId));
// 			}
// 		};
// 	}

// 	return {
// 		isOpen,
// 		dropdownTrigger,
// 		closeDropdown
// 	};
// }
