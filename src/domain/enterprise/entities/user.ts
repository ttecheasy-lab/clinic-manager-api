import { type Either, failure, success } from '@/core/either';
import { Entity } from '@/core/entities/entity';
import type { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { InvalidUserError } from '@/core/errors/entities/invalid-user';
import type { Optional } from '@/core/types/optional';

export interface UserProps {
	name: string;
	createdAt: Date;
	updatedAt: Date;
}

export class User extends Entity<UserProps> {
	static create(
		props: Optional<UserProps, 'createdAt' | 'updatedAt'>,
		id?: UniqueEntityId
	): Either<InvalidUserError, User> {
		if (props.name.length < 3 || props.name.length > 100) {
			return failure(
				new InvalidUserError(
					'Name cannot be less than 3 or bigger than 100 characters.'
				)
			);
		}

		const user = new User(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
				updatedAt: props.updatedAt ?? new Date(),
			},
			id
		);

		return success(user);
	}
}
