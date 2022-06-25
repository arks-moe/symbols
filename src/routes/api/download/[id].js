/** @type {import('./__types/[id]').RequestHandler} */
export async function get({ params }) {
	const { id } = params;
	return {
		body: id,
		status: 200
	};
}
