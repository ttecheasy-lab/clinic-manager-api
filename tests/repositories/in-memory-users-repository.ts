import type { UserCreateResponse } from '@/domain/app/repositories/types/user';
import type { UsersRepository } from '@/domain/app/repositories/users-repository';
import type { User } from '@/domain/enterprise/entities/user';

export class InMemoryUsersRepository implements UsersRepository {
	public items: User[] = [];

	public async create(user: User): Promise<UserCreateResponse> {
		this.items.push(user);

		return {
			id: user.id,
		};
	}
}
