import { beforeEach, describe, expect, it } from "bun:test";
import { createApp } from "@/infra/app";

const BASE_URL = "http://localhost:33333";

let app = createApp();

describe("Create User (e2e)", () => {
	beforeEach(() => {
		app = createApp();
	});

	it("[POST /users] create user (e2e)", async () => {
		const body = {
			name: "User",
		};

		const response = await app.handle(
			new Request(`${BASE_URL}/users`, {
				body: JSON.stringify(body),
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			})
		);

		expect(response.status).toBe(201);

		const responseBody = await response.json();

		expect(responseBody).toMatchObject({
			user: {
				name: body.name,
			},
		});
	});
});
