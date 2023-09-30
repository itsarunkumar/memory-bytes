import { json, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { RequestHandler } from './$types';

// empty route
export const GET: RequestHandler = async () => {
	return new Response('api endpoint');
};

/**
 * This POST function handles a POST request by creating a new post in a database using the
 * provided data.
 * @param event - The `event` parameter represents the incoming HTTP request event. It contains
 * information about the request, such as the request method, headers, and body. In this case, it is
 * used to extract the JSON data from the request body using `event.request.json()`.
 * @returns The code is returning the savedPost object, which represents the post that was created and
 * saved in the database.
 */
export const POST: RequestHandler = async (event) => {
	const data = await event.request.json();

	const savedPost = await prisma.post.create({
		data: {
			title: data.title,
			content: data.content,
			userId: data.userId,
			folderId: data.folder
		}
	});

	return json(savedPost);
};

/**
 * This PUT function handles a PUT request to update a post in a database using Prisma.
 * @param event - The `event` parameter is the request object that contains information about the
 * incoming request, such as the HTTP method, headers, and body. In this case, it is used to extract
 * the JSON data from the request body using `event.request.json()`.
 * @returns The code is returning an object with two properties: "status" and "updatedPost". The
 * "status" property has a value of 200, indicating a successful response, and the "updatedPost"
 * property contains the updated post data.
 */
export const PUT: RequestHandler = async (event) => {
	const data = await event.request.json();

	const updatedPost = await prisma.post.update({
		where: {
			id: data.id
		},
		data: {
			title: data.title,
			content: data.content
		}
	});

	return json(updatedPost);
};

/**
 * The DELETE function is a TypeScript code snippet that exports a DELETE request handler which deletes
 * a post from a database using Prisma ORM.
 * @param event - The `event` parameter is the event object that contains information about the HTTP
 * request being made. It includes details such as the request method, headers, and body. In this case,
 * it is being used to extract the JSON data from the request body.
 * @returns The DELETE request handler is returning an object with a status property set to 200.
 */
export const DELETE: RequestHandler = async (event) => {
	const data = await event.request.json();

	const deleteResult = await prisma.post.delete({
		where: {
			id: data.id
		}
	});

	return json(deleteResult);
};
