import { logger } from "@bogeychan/elysia-logger";
import openapi from "@elysiajs/openapi";
import Elysia from "elysia";
import z from "zod";
import { env } from "./env";
import { BaseError } from "./errors/base-error";
import { createUser } from "./http/controllers/create-user";
import { health } from "./http/controllers/health";
import "./open-telemetry";
import { opentelemetry } from "@elysiajs/opentelemetry";
import { traceExporter } from "./open-telemetry";
import { CommonCode } from "./utils/common-code";
import { StatusCode } from "./utils/status-code";

export function createApp() {
	return new Elysia()
		.use(
			logger({
				level: "error",
			})
		)
		.use(
			opentelemetry({
				traceExporter,
			})
		)
		.use(
			openapi({
				enabled: ["dev"].includes(env.NODE_ENV),
				documentation: {
					info: {
						title: "Clinic Manager Api",
						version: "1.0.0",
						description: "Api to manager a clinic",
					},
					// components: {
					// 	securitySchemes: {
					// 		bearerAuth: {
					// 			type: "http",
					// 			scheme: "bearer",
					// 			bearerFormat: "JWT",
					// 		},
					// 	},
					// },
				},
				mapJsonSchema: {
					zod: z.toJSONSchema,
				},
				path: "/docs",
			})
		)
		.onError(({ code, error, set }) => {
			if (error instanceof BaseError) {
				set.status = error.statusCode;
				return { message: error.message, code: error.code };
			}

			switch (code) {
				case "NOT_FOUND": {
					set.status = StatusCode.NOT_FOUND;
					return {
						message: "Route not found",
						code: CommonCode.NOT_FOUND_ERROR,
					};
				}
				case "VALIDATION": {
					set.status = StatusCode.BAD_REQUEST;
					return {
						message: error.customError,
						code: CommonCode.VALIDATION_ERROR,
					};
				}
				default: {
					set.status = StatusCode.INTERNAL_SERVER_ERROR;
					return {
						message: "Internal server error",
						code: CommonCode.INTERNAL_SERVER_ERROR,
					};
				}
			}
		})
		.use(health)
		.use(createUser);
}

export const app = createApp();
export type App = ReturnType<typeof createApp>;
