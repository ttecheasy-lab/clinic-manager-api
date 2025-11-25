import { CreateUserUseCase } from '@/domain/app/use-cases/create-user';
import { UsersRepositoryAdapter } from '@/infra/database/repositoriess/users-repository-adapter';

export function makeCreateUserUseCase() {
	const usersRepository = new UsersRepositoryAdapter();
	return new CreateUserUseCase(usersRepository);
}
