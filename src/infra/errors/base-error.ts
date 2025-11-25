import { CommonCode } from '../utils/common-code.ts';
import { StatusCode } from '../utils/status-code.ts';

export class BaseError extends Error {
	public readonly statusCode: StatusCode;
	public readonly code: string;

	constructor(
		message: string,
		code: string = CommonCode.INTERNAL_SERVER_ERROR,
		statusCode: StatusCode = StatusCode.INTERNAL_SERVER_ERROR
	) {
		super(message);

		this.code = code;
		this.statusCode = statusCode;

		Error.captureStackTrace?.(this, this.constructor);
	}
}
