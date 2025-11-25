import { type Either, failure, success } from "@/core/either";
import type { InvalidUserError } from "@/core/errors/entities/invalid-user";
import { User } from "@/domain/enterprise/entities/user";
import type { UsersRepository } from "../repositories/users-repository";

interface CreateUserUseCaseRequest {
	name: string;
}

type CreateUserUseCaseResponse = Either<
	InvalidUserError,
	{
		user: User;
	}
>;

export class CreateUserUseCase {
	constructor(private usersRepository: UsersRepository) {}

	public async execute({
		name,
	}: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
		const userOrError = User.create({
			name,
		});

		if (userOrError.failure()) {
			return failure(userOrError.value);
		}

		await this.usersRepository.create(userOrError.value);

		return success({
			user: userOrError.value,
		});
	}
}
