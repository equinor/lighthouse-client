import { BaseError } from './baseError';
import { CommonErrorArgs } from './errorTypes';

export interface NetworkErrorArgs extends CommonErrorArgs {
    exception?: Record<string, unknown>;
    httpStatusCode: number;
    url: string;
    message?: string;
}

/**
 * Network Error class represent a Network error ocurred during any given HTTP request
 * @param message an error message in human readable format
 * @param httpStatusCode HTTP error code
 * @param url A URL endpoint where the connection was initiated
 * @param exception a generated exception
 * @export
 * @class NetworkError
 * @extends {BaseError}
 */
export class NetworkError extends BaseError {
    constructor({ message, httpStatusCode, url, exception }: NetworkErrorArgs) {
        super({ message: message || '', exception });
        this.addProperties({ url, httpStatusCode });
        !message && (this.message = `${this.name} ${httpStatusCode} ${url}`);
    }

    getUrl = (): string => {
        return this.properties.url as string;
    };
}

export class BadRequestError extends NetworkError {}
export class BackendError extends NetworkError {}
export class ForbiddenError extends NetworkError {}
export class UnauthorizedError extends ForbiddenError {}
export class NotFoundError extends NetworkError {}
export class ValidationError extends NetworkError {}
