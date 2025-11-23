import { Entity } from '@/core/entities/entity';
import type { UniqueEntityId } from '@/core/entities/unique-entity-id';

export interface UserProps {
	name: string;
}

export class User extends Entity<UserProps> {
	static create(props: UserProps, id?: UniqueEntityId) {
		return new User(props, id);
	}
}
