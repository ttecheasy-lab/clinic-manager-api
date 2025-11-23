import type { User } from '@/domain/enterprise/entities/user';
import type { UserCreateResponse } from './types/user';

export abstract class UsersRepository {
	abstract create(user: User): Promise<UserCreateResponse>;
}
