import type { User } from '@/domain/enterprise/entities/user';

export class UserPresenter {
	static toHTTP(user: User) {
		return {
			id: user.id.toValue(),
			name: user.props.name,
			createdAt: user.props.createdAt.toISOString(),
		};
	}
}
