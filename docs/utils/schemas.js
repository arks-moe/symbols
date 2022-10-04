import * as yup from 'yup';

export const postSchema = yup.object({
	title: yup.string().trim().max(60).required(),
	sar: yup
		.mixed()
		.test(
			'Is File{}',
			`"sar" is not a application/octect-stream`,
			value => value.type === 'application/octet-stream'
		),
	thumbnail: yup
		.mixed()
		.test('Is File{}', `"thumbnail" is not a image/png`, value => value.type === 'image/png'),
	ingame_name: yup.string(),
	ingame_sound_id: yup.number(),
	ingame_layer_count: yup.number()
});

export const pageNumberSchema = yup.number().integer().positive().min(1);
