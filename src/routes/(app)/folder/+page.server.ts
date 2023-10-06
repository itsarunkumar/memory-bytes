import { prisma } from '$lib/server/prisma';
import type { Folder } from '@prisma/client';
import type { Actions, PageServerLoad } from './$types';
// import { redis } from '$lib/server/redis';

interface LoadResult {
	folders: (Folder & {
		_count: {
			posts: number;
		};
	})[];
}

export const load: PageServerLoad<LoadResult> = async ({ locals }) => {
	const session = await locals.auth.validate();

	// const cachedFolders = await redis.get(`folders:${session?.user.userId}`);
	// if (cachedFolders) {
	// 	console.log('Cached folders:', cachedFolders);
	// 	return {
	// 		folders: cachedFolders as LoadResult['folders'] // Parse cached data
	// 	};
	// }

	const folders = await prisma.folder.findMany({
		where: {
			userId: session?.user.userId
		},
		orderBy: {
			created_at: 'asc'
		},
		include: {
			_count: {
				select: {
					posts: true
				}
			}
		}
	});

	// await redis.set(`folders:${session?.user.userId}`, JSON.stringify(folders)); // Cache the folders

	return {
		folders
	};
};

export const actions: Actions = {
	createFolder: async ({ request, locals }) => {
		const formData = await request.formData();
		const folderName = formData.get('foldername');
		const session = await locals.auth.validate();

		const newFolder = await prisma.folder.create({
			data: {
				name: folderName as string,
				userId: session?.user.userId
			}
		});

		// Remove the cached data for folders since it's changed
		// await redis.del(`folders:${session?.user.userId}`);

		return {
			newFolder
		};
	},
	deleteFolder: async ({ request, url, locals }) => {
		const formData = await request.formData();
		const folderId = formData.get('id');
		const session = await locals.auth.validate();

		const deleteFolder = await prisma.folder.delete({
			where: {
				id: folderId as string
			}
		});

		// Remove the cached data for folders since it's changed
		// await redis.del(`folders:${session?.user.userId}`);

		return {
			deleteFolder
		};
	}
};
