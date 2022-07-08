import jwt from 'jsonwebtoken';
import ClientError from '$lib/server/client-error';

export default function errorHandler(err) {
	console.error(err);
	if (err instanceof ClientError) {
		const { status, message } = err;
		return {
			status,
			body: { error: message }
		};
	}
	if (err instanceof jwt.JsonWebTokenError) {
		return { status: 400, body: { error: err.message } };
	}
	if (err instanceof TypeError) {
		return {
			status: 400,
			body: { error: 'Expecting form data' }
		};
	}
	return {
		status: 500,
		body: { error: err.message }
	};
}
