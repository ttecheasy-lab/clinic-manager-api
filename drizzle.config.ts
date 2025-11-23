import { env } from "@/infra/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  schema: './src/infra/database/drizzle/schema/*',
  out: './src/infra/database/drizzle/migrations',
  casing: 'snake_case'
})
