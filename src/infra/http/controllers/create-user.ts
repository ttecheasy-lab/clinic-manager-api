import Elysia from "elysia";
import z from "zod";
import { CommonCode } from "@/infra/utils/common-code";
import { StatusCode } from "@/infra/utils/status-code";
import { dispatchError } from "../errors/dispatch-error";
import { UserPresenter } from "../presenters/user-presenter";
import { makeCreateUserUseCase } from "./factories/make-create-user-use-case";

export const createUser = new Elysia().post(
	"/users",
	async ({ body, status }) => {
		const createUserUseCase = makeCreateUserUseCase();

		const { name } = body;

		const result = await createUserUseCase.execute({
			name,
		});

		if (result.failure()) {
			throw dispatchError(result.value);
		}

		const { user } = result.value;

		return status(StatusCode.CREATED, {
			user: UserPresenter.toHTTP(user),
		});
	},
	{
		detail: {
			summary: "Create a new user",
			tags: ["users"],
		},
		body: z.object({
			name: z
				.string()
				.min(3, { error: "Name cannot be less than 3 characters." })
				.max(100, { error: "Name cannot be bigger than 100 characters." }),
		}),
		response: {
			201: z.object({
				user: z.object({
					id: z.uuidv7(),
					name: z.string(),
					createdAt: z.string(),
				}),
			}),
			400: z.object({
				code: z.literal(CommonCode.VALIDATION_ERROR),
				message: z.string(),
			}),
		},
	}
);
