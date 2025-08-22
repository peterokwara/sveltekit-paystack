import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	register: async ({ cookies, request }) => {
		const data = await request.formData();
		const redirectTo = data.get('redirect')?.toString() || '/app/dashboard';

		// Simulate successful registration by setting a cookie
		cookies.set('sessionid', 'mock-session-id', {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 7 // 1 week
		});

		throw redirect(303, redirectTo);
	}
};
