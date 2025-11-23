import z from 'zod'

export const envSchema = z.object({
	PORT: z.coerce.number().default(3333),
	NODE_ENV: z.enum(['test', 'dev', 'production']).default('production'),
})

export const env = envSchema.parse(process.env)
