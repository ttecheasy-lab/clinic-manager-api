import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  schema: './src/infra/database/drizzle/schema/index.ts',
  out: './src/infra/database/drizzle/migrations',
  casing: 'snake_case',
})
