import getFormBody from '$lib/server/get-form-body';

/** @type {import('./__types/test').RequestHandler} */
export async function post({ request }) {
	const formData = await request.formData();
	const body = getFormBody(formData);
	console.log(body.sar.type);
	return {};
}
