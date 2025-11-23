import Elysia from 'elysia';
import z from 'zod';

export const health = new Elysia().get(
	'/health',
	() => {
		return {
			ok: true,
		};
	},
	{
		detail: {
			summary: 'Verify if server is runnnig',
			tags: ['health'],
		},
		response: {
			200: z.object({
				ok: z.boolean(),
			}),
		},
	}
);
