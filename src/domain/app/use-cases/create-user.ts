import { type Either, success } from '@/core/either';
import { User } from '@/domain/enterprise/entities/user';
import type { UsersRepository } from '../repositories/users-repository';

interface CreateUserUseCaseRequest {
	name: string;
}

type CreateUserUseCaseResponse = Either<
	null,
	{
		user: User;
	}
>;

export class CreateUserUseCase {
	constructor(private usersRepository: UsersRepository) {}

	public async execute({
		name,
	}: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
		const user = User.create({
			name,
		});

		await this.usersRepository.create(user);

		return success({
			user,
		});
	}
}
