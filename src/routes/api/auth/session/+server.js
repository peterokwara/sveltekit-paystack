import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ cookies }) => {
	// In a real app, you'd create a proper session. Here, we just set the mock cookie.
	cookies.set('sessionid', 'mock-session-id', {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		maxAge: 60 * 60 * 24 * 7 // 1 week
	});

	return json({ success: true });
};
