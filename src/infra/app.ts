import openapi from '@elysiajs/openapi';
import Elysia from 'elysia';
import z from 'zod';
import { health } from './http/controllers/health';

export function createApp() {
	return new Elysia()
		.use(
			openapi({
				documentation: {
					info: {
						title: 'Clinic Manager Api',
						version: '1.0.0',
						description: 'Api to manager a clinic',
					},
					components: {
						securitySchemes: {
							bearerAuth: {
								type: 'http',
								scheme: 'bearer',
								bearerFormat: 'JWT',
							},
						},
					},
				},
				mapJsonSchema: {
					zod: z.toJSONSchema,
				},
				path: '/docs',
			})
		)
		.use(health);
}

export const app = createApp();
export type App = ReturnType<typeof createApp>;
