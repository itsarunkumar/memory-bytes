// src/hooks.server.ts
import { auth } from '$lib/server/lucia';
import { redirect, type Handle } from '@sveltejs/kit';

const public_routes = ['/', '/(auth)/login', '/(auth)/signup'];

/**
 * Handles the given event and resolves it.
 *
 * @param {HandleEvent} event - the event to handle
 * @param {ResolveFunction} resolve - the function to resolve the event
 * @returns {Promise<any>} a promise that resolves with the result of the resolved event
 */
export const handle: Handle = async ({ event, resolve }) => {
	// we can pass `event` because we used the SvelteKit middleware
	event.locals.auth = auth.handleRequest(event);

	const user = await event.locals.auth.validate();

	if (!user && !public_routes.includes(event.route.id as string)) {
		throw redirect(302, '/login');
	}

	return await resolve(event);
};
