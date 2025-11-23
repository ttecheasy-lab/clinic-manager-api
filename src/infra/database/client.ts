import { drizzle } from 'drizzle-orm/postgres-js';
import { env } from '@/infra/env';
import { schema } from './drizzle/schema';

export const db = drizzle(env.DATABASE_URL, {
	casing: 'snake_case',
	schema,
});
