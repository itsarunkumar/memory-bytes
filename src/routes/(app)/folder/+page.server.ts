import { prisma } from '$lib/server/prisma';
import type { Folder } from '@prisma/client';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const session = await locals.auth.validate();

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

	return {
		folders
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	createFolder: async ({ request, locals }) => {
		const formData = await request.formData();
		const folderName = formData.get('foldername');
		const session = await locals.auth.validate();

		const newFolder = (await prisma.folder.create({
			data: {
				name: folderName as string,
				userId: session?.user.userId
			}
		})) satisfies Folder;

		return {
			newFolder
		};
	},
	deleteFolder: async ({ request, url }) => {
		const formData = await request.formData();
		const folderId = formData.get('id');

		const deleteFolder = (await prisma.folder.delete({
			where: {
				id: folderId as string
			}
		})) satisfies Folder;

		return {
			deleteFolder
		};
	}
};
