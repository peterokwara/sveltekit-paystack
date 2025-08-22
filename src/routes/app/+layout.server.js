import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export const load = async ({ locals, url }) => {
	const { user, accessContext } = locals;

	// 1. First, ensure the user is logged in at all.
	if (!user) {
		// Redirect to login, but remember where they were trying to go.
		throw redirect(303, `/login?redirect=${url.pathname}`);
	}

	// 2. Make the decision based on the data from the root layout.
	if (accessContext?.status === 'never_purchased') {
		// Hard wall for new users.
		throw redirect(303, `/paywall?redirect=${url.pathname}`);
	}

	return {
		user
	};
};
