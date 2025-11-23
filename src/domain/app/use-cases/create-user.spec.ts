import { beforeAll, describe, expect, it } from 'bun:test';
import { InMemoryUsersRepository } from '@/repositories/in-memory-users-repository';
import { CreateUserUseCase } from './create-user';

describe('Create User Use Case', () => {
	let usersRepository: InMemoryUsersRepository;
	let sut: CreateUserUseCase;

	beforeAll(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new CreateUserUseCase(usersRepository);
	});

	it('should create user', async () => {
		const data = {
			name: 'John Doe',
		};

		const result = await sut.execute(data);

		expect(result.value?.user).toMatchObject({
			props: {
				name: data.name,
			},
		});
	});
});
