// import { writable, get } from 'svelte/store';
// import { browser } from '$app/environment';

// export default function theme() {
// 	const isDarkMode = writable<boolean>(false);

// 	function setDarkMode(value: boolean) {
// 		isDarkMode.set(value);
// 		localStorage.setItem('theme', value ? 'dark' : 'light');
// 		document.documentElement.classList.toggle('dark', value);
// 	}

// 	function toggle() {
// 		setDarkMode(!get(isDarkMode));
// 	}

// 	function themeSwitch(node: HTMLElement) {
// 		if (browser) {
// 			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// 			// Check localStorage for the theme preference
// 			const storedTheme = localStorage.getItem('theme');

// 			// If a theme is stored in localStorage, use it; otherwise, use prefersDark.matches
// 			const initialTheme = storedTheme === 'dark' || (!storedTheme && prefersDark.matches);

// 			console.log('initail', initialTheme);

// 			// Set the initial theme mode
// 			setDarkMode(initialTheme);
// 		}

// 		function handleChange() {
// 			toggle();
// 		}

// 		node.addEventListener('click', handleChange);

// 		return {
// 			destroy() {
// 				node.removeEventListener('click', handleChange);
// 			}
// 		};
// 	}

// 	return {
// 		themeSwitch,
// 		isDarkMode
// 	};
// }

// import { writable, derived, get } from 'svelte/store';
// import { browser } from '$app/environment';

// export default function theme() {
// 	const isDarkMode = writable<boolean>(false);

// 	const themePreference = derived(isDarkMode, ($isDarkMode) => ($isDarkMode ? 'dark' : 'light'));

// 	// Function to set the theme mode
// 	function setDarkMode(value: boolean) {
// 		isDarkMode.set(value);
// 		localStorage.setItem('theme', value ? 'dark' : 'light');
// 		document.documentElement.classList.toggle('dark', value);
// 	}

// 	// Function to toggle the theme mode
// 	function toggle() {
// 		setDarkMode(!get(isDarkMode));
// 	}

// 	function themeSwitch(node: HTMLElement) {
// 		if (browser) {
// 			// Check localStorage for the theme preference
// 			const storedTheme = localStorage.getItem('theme');

// 			// Determine whether the user prefers dark mode
// 			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// 			// Use the user's preference if available; otherwise, use stored or default theme
// 			const initialTheme = storedTheme === 'dark' || (!storedTheme && prefersDark.matches) || false;

// 			// Set the initial theme mode
// 			setDarkMode(initialTheme);

// 			// Listen for changes in the user's preferred color scheme
// 			prefersDark.addEventListener('change', (event) => {
// 				setDarkMode(event.matches);
// 			});
// 		}

// 		function handleChange() {
// 			toggle();
// 		}

// 		node.addEventListener('click', handleChange);

// 		return {
// 			destroy() {
// 				node.removeEventListener('click', handleChange);
// 			}
// 		};
// 	}

// 	return {
// 		themeSwitch,
// 		isDarkMode,
// 		themePreference
// 	};
// }

import { onMount } from 'svelte';
import { writable } from 'svelte/store';

// Function to set the theme mode
function setTheme(value: boolean | undefined) {
	document.documentElement.classList.toggle('dark', value);
	localStorage.setItem('theme', value ? 'dark' : 'light');
}

// Function to toggle the theme mode
function toggleTheme() {
	setTheme(!document.documentElement.classList.contains('dark'));
}

export function themeToggle(node: HTMLElement) {
	onMount(() => {
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
		const storedTheme = localStorage.getItem('theme');
		const initialTheme =
			(storedTheme === 'dark' && !prefersDark.matches) ||
			(storedTheme === 'light' && prefersDark.matches) ||
			prefersDark.matches;

		setTheme(initialTheme);

		// Listen for changes in the user's preferred color scheme
		prefersDark.addEventListener('change', (event) => {
			if (!localStorage.getItem('theme')) {
				setTheme(event.matches);
			}
		});
	});

	node.addEventListener('click', toggleTheme);

	return {
		destroy() {
			node.removeEventListener('click', toggleTheme);
		}
	};
}

// Function to create the theme management
export function theme() {
	const isDarkMode = writable(false);

	function setDarkMode(value: boolean) {
		isDarkMode.set(value);
		setTheme(value);
	}

	const themeSwitch = (node: HTMLElement) => {
		onMount(() => {
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
			const storedTheme = localStorage.getItem('theme');
			const initialTheme =
				(storedTheme === 'dark' && !prefersDark.matches) ||
				(storedTheme === 'light' && prefersDark.matches) ||
				prefersDark.matches;

			setDarkMode(initialTheme);

			// Listen for changes in the user's preferred color scheme
			prefersDark.addEventListener('change', (event) => {
				if (!localStorage.getItem('theme')) {
					setDarkMode(event.matches);
				}
			});
		});

		node.addEventListener('click', toggleTheme);

		return {
			destroy() {
				node.removeEventListener('click', toggleTheme);
			}
		};
	};

	return {
		themeSwitch,
		isDarkMode
	};
}
