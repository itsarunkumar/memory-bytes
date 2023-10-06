import { prisma } from '$lib/server/prisma';
import type { Prisma, Post } from '@prisma/client';
import type { PageServerLoad } from './$types';

interface GroupedPost {
	date: string;
	bytes: Post[];
}

export const load: PageServerLoad = async ({ locals }) => {
	try {
		// Validate the user's session
		const session = await locals.auth.validate();

		if (!session) {
			return;
		}

		// Fetch posts for the user and group them by date
		const groupedPosts: GroupedPost[] = await getGroupedPosts(session.user.userId as string);

		return {
			df: groupedPosts as GroupedPost[]
		};
	} catch (error) {
		console.error('Error in load function:', error);
		throw new Error('Failed to load data.');
	}
};

async function getGroupedPosts(userId: string): Promise<GroupedPost[]> {
	const posts: Post[] = await prisma.post.findMany({
		where: {
			userId
		},
		orderBy: {
			updated_at: 'desc'
		}
	});

	// Group posts by date while excluding the time portion
	const groupedPosts: { [date: string]: Post[] } = {};
	posts.forEach((post) => {
		const date = post.updated_at.toISOString().split('T')[0]; // Extract date portion

		if (!groupedPosts[date]) {
			groupedPosts[date] = [];
		}

		groupedPosts[date].push(post);
	});

	// Convert the groupedPosts object to an array of objects
	return Object.keys(groupedPosts).map((date) => ({
		date,
		bytes: groupedPosts[date]
	}));
}
