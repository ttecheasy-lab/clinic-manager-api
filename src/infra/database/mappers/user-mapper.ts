import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { User } from '@/domain/enterprise/entities/user';

interface UserPersisted {
	id: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
}

export class UserMapper {
	static toDomain(user: UserPersisted): User {
		const userOrError = User.create(
			{
				name: user.name,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			},
			new UniqueEntityId(user.id)
		);

		if (userOrError.failure()) {
			throw userOrError.value;
		}

		return userOrError.value;
	}

	static toDatabase(user: User): UserPersisted {
		return {
			id: user.id.toValue(),
			name: user.props.name,
			createdAt: user.props.createdAt,
			updatedAt: user.props.updatedAt,
		};
	}
}
