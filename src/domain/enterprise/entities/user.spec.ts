import { describe, expect, it } from "bun:test";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { InvalidUserError } from "@/core/errors/entities/invalid-user";
import { User } from "./user";

describe("User entity", () => {
	it("should receive error when name is less than 3 characters.", () => {
		const user = User.create({
			name: "sd",
		});

		expect(user.failure()).toBe(true);
		expect(user.value).toBeInstanceOf(InvalidUserError);
	});

	it("should receive error when name is bigger than 100 characters.", () => {
		const user = User.create({
			name: "Test".repeat(100),
		});

		expect(user.failure()).toBe(true);
		expect(user.value).toBeInstanceOf(InvalidUserError);
	});

	it("should create user with a dynamic id", () => {
		const user = User.create({
			name: "John Doe",
		});

		expect(user.success()).toBe(true);

		if (user.failure()) return;

		expect(user.value.id).toBeDefined();
		expect(user.value.props).toMatchObject({
			name: "John Doe",
		});
	});

	it("should create user with id", () => {
		const user = User.create(
			{
				name: "John Doe",
			},
			new UniqueEntityId("id")
		);

		expect(user.success()).toBe(true);

		if (user.failure()) return;

		expect(user.value.id.toValue()).toEqual("id");
		expect(user.value.props).toMatchObject({
			name: "John Doe",
		});
	});
});
