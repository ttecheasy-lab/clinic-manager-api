import { afterAll, beforeAll, beforeEach } from "bun:test";
import { execSync } from "node:child_process";
import { randomUUIDv7 } from "bun";
import postgres from "postgres";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");

const baseUrl = new URL(process.env.DATABASE_URL);

const databaseName = baseUrl.pathname;
const workerDatabaseName = `${databaseName}_${randomUUIDv7().replace(/-/g, "")}`;

const workerUrl = new URL(baseUrl.toString());

workerUrl.pathname = `/${workerDatabaseName}`;

process.env.DATABASE_URL = workerUrl.toString();

const sqlTest = postgres(baseUrl.toString());
const sqlWorkerDatabase = postgres(process.env.DATABASE_URL);

beforeAll(async () => {
	const dbExists = await sqlTest`
    SELECT 1 FROM pg_database WHERE datname = ${workerDatabaseName}
  `;

	if (dbExists.length === 0) {
		await sqlTest.unsafe(`CREATE DATABASE "${workerDatabaseName}"`);
	}

	execSync("bun db:migrate", {
		env: process.env,
		stdio: "inherit",
	});
});

beforeEach(async () => {
	const tables = await sqlWorkerDatabase<Array<{ tablename: string }>>`
    SELECT tablename FROM pg_tables WHERE schemaname='public'
  `;

	for await (const { tablename } of tables) {
		await sqlWorkerDatabase.unsafe(
			`TRUNCATE TABLE "${tablename}" RESTART IDENTITY CASCADE;`
		);
	}
});

afterAll(async () => {
	try {
		await sqlWorkerDatabase.end();
		await sqlTest.unsafe(
			`DROP DATABASE IF EXISTS "${workerDatabaseName}" WITH (FORCE)`
		);
	} catch {
	} finally {
		await sqlTest.end();
	}
});
