import { InvalidUserError } from "@/core/errors/entities/invalid-user";
import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error.ts";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error.ts";
import { BadRequestError } from "@/infra/errors/bad-request-error";
import { ConflictError } from "@/infra/errors/conflict-error";

export function dispatchError(error: Error) {
	const errorClassName = error.constructor.name;

	if (
		[InvalidUserError.name, ResourceNotFoundError.name].includes(errorClassName)
	) {
		return new BadRequestError(error.message);
	}

	if ([ResourceAlreadyExistsError.name].includes(errorClassName)) {
		return new ConflictError(error.message);
	}
}
