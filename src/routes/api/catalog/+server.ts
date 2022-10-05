import { json, error as httpError } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import schemas from '$lib/schemas';
import * as yup from 'yup';

const paramSchema = yup.object({
	page: schemas.pageNumber.required()
});

export const GET: RequestHandler = async ({ url }) => {
	try {
		const searchParams = Object.fromEntries(url.searchParams.entries());
		const { page } = paramSchema.validateSync(searchParams);

		return json({ message: page });
	} catch (error) {
		if (error instanceof yup.ValidationError) {
			throw httpError(400, { message: error.message });
		} else {
			console.error(error);
			throw httpError(500, 'Something went wrong...');
		}
	}
};
