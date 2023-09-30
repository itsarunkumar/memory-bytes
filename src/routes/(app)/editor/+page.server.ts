import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load = (async ({ url }) => {
	const options = url.searchParams.getAll('byte');
	if (options.length > 0) {
		const [id, mode, folder] = options;
		const byte = await prisma.post.findUnique({
			where: {
				id: id,
				folderId: folder
			}
		});

		console.log(byte);
		return {
			byte,
			id,
			mode,
			folder
		};
	}

	return {};
}) satisfies PageServerLoad;
