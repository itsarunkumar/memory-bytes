import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const session = await locals.auth.validate();

	if (!session) {
		return {
			loggedIn: false
		};
	}

	return {
		loggedIn: true,
		user: session?.user
	};
}) satisfies LayoutServerLoad;
