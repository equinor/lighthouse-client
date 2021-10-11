import { AccountInfo, SilentRequest } from '@azure/msal-browser';
import { AuthenticationProvider } from '../../authentication';
import ArgumentError from './argumentError';
import { BaseError } from './baseError';
import { ErrorInitializerFunction } from './errorTypes';
import {
    BackendError,
    BadRequestError,
    ForbiddenError,
    NetworkError,
    NetworkErrorArgs,
    NotFoundError,
    UnauthorizedError,
    ValidationError
} from './networkError';

export class AuthenticationError extends BaseError {}

export function baseClient(
    newAuthProvider: AuthenticationProvider,
    scopes: string[]
) {
    const authProvider: AuthenticationProvider = newAuthProvider;

    function getSilentRequest(user: AccountInfo): SilentRequest {
        return {
            account: user,
            forceRefresh: false,
            scopes
        };
    }

    /**
     * Returns true if user is authenticated
     *
     * @return {*}  {boolean}
     * @memberof BaseClient
     */
    function isAuthenticated(): boolean {
        return authProvider.isAuthenticated();
    }

    async function getAccessToken(): Promise<string> {
        if (!authProvider.getCurrentUser())
            throw new ArgumentError({
                argumentName: 'authProvider.userProperties.account'
            });

        try {
            return await authProvider.getAccessToken(scopes);
        } catch (exception) {
            throw new AuthenticationError({
                message: 'failed to authenticate'
            });
        }
    }

    /**
     * Fetch with accessToken from authProvider.
     *
     * @return {*}  {Promise<Response>}
     * @memberof BaseClient
     */
    async function fetch(
        url: string,
        headerOptions: Record<string, unknown> = {},
        method = 'GET',
        body?: BodyInit,
        signal?: AbortSignal
    ): Promise<Response> {
        if (!authProvider.getCurrentUser())
            throw new ArgumentError({
                argumentName: 'authProvider.userProperties.account'
            });
        const accessToken = await getAccessToken();
        return await fetchWithToken(
            url,
            accessToken,
            headerOptions,
            method,
            body,
            signal
        );
    }

    /**
     * Fetch with specific accessToken.
     *
     * @return {*}  {Promise<Response>}
     * @memberof BaseClient
     */
    async function fetchWithToken(
        endpoint: string,
        token: string,
        headerOptions: Record<string, unknown> = {
            'Content-Type': 'application/json'
        },
        method = 'GET',
        body?: BodyInit,
        signal?: AbortSignal
    ): Promise<Response> {
        let statusCode = 0;
        try {
            const headers = {
                Authorization: 'Bearer ' + token,
                ...headerOptions
            };

            const response: Response = await fetch(endpoint, {
                method,
                headers,
                body,
                signal
            });

            if (response.status) statusCode = response.status;

            if (response && !response.ok) {
                const contentType = response.headers.get('content-type');
                if (
                    contentType &&
                    contentType.indexOf('application/json') !== -1
                ) {
                    throw await response.json();
                } else {
                    throw await response.text();
                }
            }
            return response;
        } catch (exception) {
            const errorInstance = initializeError(NetworkError, {
                httpStatusCode: statusCode,
                url: endpoint
            });
            throw errorInstance;
        }
    }

    return {
        fetch,
        fetchWithToken,
        isAuthenticated
    };
}

const initializeError: ErrorInitializerFunction<
    NetworkError,
    NetworkErrorArgs
> = (ErrorType, args): BaseError => {
    switch (args.httpStatusCode) {
        case 400:
            if (
                args.exception?.title &&
                (args.exception?.title as string)
                    .toLowerCase()
                    .includes('validation')
            )
                return new ValidationError(args);
            break;
        case 401:
            return new UnauthorizedError(args);
        case 403:
            return new ForbiddenError(args);

        case 404:
            return new NotFoundError(args);
    }

    if (args.httpStatusCode > 0 && args.httpStatusCode < 550 && args.exception)
        return new BackendError(args); //our backEnd return a json property called exception.
    if (args.httpStatusCode == 400) return new BadRequestError(args);

    return new ErrorType(args);
};
