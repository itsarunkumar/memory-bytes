import { prisma } from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
	const session = await locals.auth.validate();
	const folderPosts = await prisma.post.findMany({
		where: {
			folderId: params.folderid,
			userId: session?.user.userId
		},
		select: {
			title: true,
			id: true,
			folderId: true,
			updated_at: true
		},
		orderBy: {
			updated_at: 'desc'
		}
	});

	const folder = await prisma.folder.findUnique({
		where: {
			id: params.folderid
		},

		select: {
			name: true,
			_count: {
				select: {
					posts: true
				}
			}
		}
	});

	return {
		posts: folderPosts,
		folder
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	deleteByte: async ({ request, params }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		const deleteByte = await prisma.post.delete({
			where: {
				id: id as string
			}
		});

		return {
			deleteByte
		};
	}
};
