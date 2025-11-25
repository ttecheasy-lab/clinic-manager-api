import type { UserCreateResponse } from '@/domain/app/repositories/types/user';
import { UsersRepository } from '@/domain/app/repositories/users-repository';
import type { User } from '@/domain/enterprise/entities/user';
import { db } from '../client';
import { schema } from '../drizzle/schema';
import { UserMapper } from '../mappers/user-mapper';

export class UsersRepositoryAdapter extends UsersRepository {
	public async create(user: User): Promise<UserCreateResponse> {
		const row = UserMapper.toDatabase(user);

		await db.insert(schema.users).values(row).returning({
			id: schema.users.id,
		});

		return {
			id: user.id,
		};
	}
}
