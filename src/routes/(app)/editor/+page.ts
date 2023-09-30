import type { PageLoad } from './$types';
export const ssr = false;

export const load = (async ({ data }) => {
	console.log(data, 'data frompage.ts');

	return {
		...data
	};
}) satisfies PageLoad;
