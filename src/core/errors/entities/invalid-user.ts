import { DomainError } from '../domain-error';
import { DomainCode } from '../enums/domain-code';

export class InvalidUserError extends DomainError {
	constructor(message?: string, code?: string) {
		super(message ?? 'Invalid User.', code ?? DomainCode.INVALID_USER_ERROR);
	}
}
