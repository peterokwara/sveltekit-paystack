// src/hooks.server.ts
import { redirect } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get('sessionid');

	// Mock user session
	if (sessionId === 'mock-session-id') {
		event.locals.user = {
			id: 'mock-user-id',
			email: 'user@example.com'
		};
		// Mock subscription status
		event.locals.accessContext = {
			status: 'never_purchased'
		};
	} else {
		event.locals.user = null;
		event.locals.accessContext = null;
	}

	const response = await resolve(event);
	return response;
};
