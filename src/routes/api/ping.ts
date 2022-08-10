import type { RequestHandler } from './__types/ping';

export const GET: RequestHandler = async event => {
	return {
		body: {
			message: 'hi'
		}
	};
};
