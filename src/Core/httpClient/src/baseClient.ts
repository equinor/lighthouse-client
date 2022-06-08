import { AuthenticationProvider } from '@equinor/authentication';
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
type ProgressCallback = (progress: number) => void;

export interface HttpClient {
    fetch(url: string, init?: RequestInit | undefined): Promise<Response>;
    get(url: string, init?: RequestInit | undefined): Promise<Response>;
    post(url: string, init?: RequestInit | undefined): Promise<Response>;
    put(url: string, init?: RequestInit | undefined): Promise<Response>;
    patch(url: string, init?: RequestInit | undefined): Promise<Response>;
    delete(url: string, init?: RequestInit | undefined): Promise<Response>;
    head(url: string, init?: RequestInit | undefined): Promise<Response>;
    getAccessToken(): Promise<string>;
    uploadFile(
        url: string,
        formData: FormData,
        progressCallback?: ProgressCallback,
        init?: RequestInit | undefined
    ): Promise<Response>;
    fetchWithToken(
        endpoint: string,
        token: string,
        init?: RequestInit | undefined
    ): Promise<Response>;
    isAuthenticated(): boolean;
    setBaseUrl(baseUrl: string): void;
    setScopes(scopes: string[]): void;
    getBaseUrl(): string | undefined;
}

export function baseClient(
    newAuthProvider: AuthenticationProvider,
    scopes?: string[],
    baseUrl?: string
): HttpClient {
    const authProvider: AuthenticationProvider = newAuthProvider;
    let _scopes = scopes || [''];
    let _baseUrl = baseUrl || '';

    /**
     * Setts a new base url for the HttpClient
     * @memberof BaseClient
     */
    function setBaseUrl(baseUrl): void {
        _baseUrl = baseUrl;
    }

    /**
     * Setts new scopes for the HttpClient
     * @memberof BaseClient
     */
    function setScopes(scopes: string[]): void {
        _scopes = scopes;
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
                argumentName: 'authProvider.userProperties.account',
            });
        try {
            return await authProvider.getAccessToken(_scopes);
        } catch (exception) {
            throw new AuthenticationError({
                message: 'failed to authenticate',
            });
        }
    }

    async function get(url: string, requestInit?: RequestInit) {
        requestInit = {
            method: 'GET',
            ...requestInit,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...requestInit?.headers,
            },
        };
        return _fetch(url, requestInit);
    }

    async function post(url: string, requestInit?: RequestInit) {
        requestInit = {
            method: 'POST',
            ...requestInit,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...requestInit?.headers,
            },
        };
        return _fetch(url, requestInit);
    }

    async function put(url: string, requestInit?: RequestInit) {
        requestInit = {
            method: 'PUT',
            ...requestInit,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...requestInit?.headers,
            },
        };
        return _fetch(url, requestInit);
    }
    async function patch(url: string, requestInit?: RequestInit) {
        requestInit = {
            method: 'PATCH',
            ...requestInit,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...requestInit?.headers,
            },
        };
        return _fetch(url, requestInit);
    }

    async function _delete(url: string, requestInit?: RequestInit) {
        requestInit = {
            method: 'DELETE',
            ...requestInit,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...requestInit?.headers,
            },
        };
        return _fetch(url, requestInit);
    }

    async function head(url: string, requestInit?: RequestInit) {
        requestInit = {
            method: 'HEAD',
            ...requestInit,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...requestInit?.headers,
            },
        };
        return _fetch(url, requestInit);
    }

    async function uploadFile(endpoint: string, formData: FormData) {
        const token = await getAccessToken();
        const url = _baseUrl + endpoint;

        let statusCode = 0;
        try {
            const requestInit = {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            };
            const response: Response = await fetch(url, requestInit);

            if (response.status) statusCode = response.status;

            if (response && !response.ok) {
                initializeError(NetworkError, { httpStatusCode: statusCode, url });
            }
            return response;
        } catch (Exception) {
            initializeError(NetworkError, { httpStatusCode: statusCode, url });
            throw Exception;
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
        requestInit?: RequestInit
    ): Promise<Response> {
        let statusCode = 0;
        const url = _baseUrl + endpoint;
        try {
            requestInit = {
                ...requestInit,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                    ...requestInit?.headers,
                },
            };
            const response: Response = await fetch(url, requestInit);

            if (response.status) statusCode = response.status;

            // if (response && !response.ok) {
            //     initializeError(NetworkError, { httpStatusCode: statusCode, url });
            // }
            return response;
        } catch (Exception) {
            initializeError(NetworkError, { httpStatusCode: statusCode, url });
            throw Exception;
        }
    }

    /**
     * Fetch with accessToken from authProvider.
     *
     * @return {*}  {Promise<Response>}
     * @memberof BaseClient
     */
    async function _fetch(url: string, requestInit?: RequestInit): Promise<Response> {
        if (!authProvider.getCurrentUser())
            throw new ArgumentError({
                argumentName: 'authProvider.userProperties.account',
            });
        const accessToken = await getAccessToken();

        return await fetchWithToken(url, accessToken, requestInit);
    }

    function getBaseUrl(): string | undefined {
        return baseUrl;
    }

    return {
        get,
        post,
        put,
        patch,
        delete: _delete,
        head,
        uploadFile,
        fetch: _fetch,
        fetchWithToken,
        getAccessToken,
        isAuthenticated,
        setBaseUrl,
        setScopes,
        getBaseUrl,
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
