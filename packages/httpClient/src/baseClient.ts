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
    ValidationError,
} from './networkError';

export class AuthenticationError extends BaseError {}

export interface BaseClient {
    fetch: (url: string, init?: RequestInit | undefined) => Promise<Response>;
    fetchWithToken: (
        endpoint: string,
        token: string,
        init?: RequestInit | undefined
    ) => Promise<Response>;
    isAuthenticated: () => boolean;
}

export function baseClient(
    newAuthProvider: AuthenticationProvider,
    newScopes?: string[]
): BaseClient {
    const authProvider: AuthenticationProvider = newAuthProvider;
    const scopes = newScopes;

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
                argumentName: 'authProvider.userProperties.account',
            });
        try {
            return await authProvider.getAccessToken(scopes);
        } catch (exception) {
            throw new AuthenticationError({
                message: 'failed to authenticate',
            });
        }
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
        init?: RequestInit
    ): Promise<Response> {
        let statusCode = 0;

        try {
            init = {
                method: 'GET',
                ...init,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                    ...init?.headers,
                },
            };
            const response: Response = await fetch(endpoint, init);

            if (response.status) statusCode = response.status;

            if (response && !response.ok) {
                initializeError(NetworkError, { httpStatusCode: statusCode, url: endpoint });
            }
            return response;
        } catch (Exception) {
            initializeError(NetworkError, { httpStatusCode: statusCode, url: endpoint });
            throw Exception;
        }
    }

    /**
     * Fetch with accessToken from authProvider.
     *
     * @return {*}  {Promise<Response>}
     * @memberof BaseClient
     */
    async function clientFetch(url: string, init?: RequestInit): Promise<Response> {
        if (!authProvider.getCurrentUser())
            throw new ArgumentError({
                argumentName: 'authProvider.userProperties.account',
            });
        const accessToken = await getAccessToken();

        return await fetchWithToken(url, accessToken, init);
    }

    return {
        fetch: clientFetch,
        fetchWithToken,
        isAuthenticated,
    };
}

const initializeError: ErrorInitializerFunction<NetworkError, NetworkErrorArgs> = (
    ErrorType,
    args
): NetworkError => {
    switch (args.httpStatusCode) {
        case 400:
            if (
                args.exception?.title &&
                (args.exception?.title as string).toLowerCase().includes('validation')
            )
                throw new ValidationError(args);
            break;
        case 401:
            throw new UnauthorizedError(args);
        case 403:
            throw new ForbiddenError(args);

        case 404:
            throw new NotFoundError(args);
    }

    if (args.httpStatusCode > 0 && args.httpStatusCode < 550 && args.exception)
        throw new BackendError(args); //our backEnd return a json property called exception.
    if (args.httpStatusCode == 400) throw new BadRequestError(args);

    return new ErrorType(args);
};
