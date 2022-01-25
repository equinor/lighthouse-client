import { baseClient } from '@equinor/http-client';
import { HttpClients } from '../Types/HttpClients';
import { Scope } from '../Types/ScopeAndUrls';
import { getAuthProvider } from './getAuthProvider';
import { readAppConfig } from './Readers';

export interface HttpClientOptions {
    scope: string;
    baseUrl?: string;
}

/**
 * Return configured httpClients according to what appConfig.urls provides.
 * the httpClients are pre scooped with the associated scope.
 *
 * ```
 * const {scopeChange} = httpClient();
 * ```
 * This wil provide a http client predefined with the current
 * environments scope and url for scopeChange
 *
 * By providing options under development one can create customHttpClient.
 * when committing to dev one should register the scope and url in the infra repo.
 *
 * @param {HttpClientOptions} [options]
 * @return {*}  {HttpClients}
 */
export function httpClient(options?: HttpClientOptions): HttpClients {
    const appConfig = readAppConfig();
    const authProvider = getAuthProvider();

    const customScope = options?.scope || '';

    const apiClients = {
        customHttpClient: baseClient(authProvider, [customScope]),
    };

    Object.keys(appConfig.scope).forEach((key) => {
        apiClients[key] = baseClient(
            authProvider,
            getScope(key, appConfig.scope)
            // appConfig.urls[key]
        );
    });

    return apiClients as HttpClients;
}

function getScope(key: string, scopes: Scope): string[] {
    const currentScope = scopes[key];

    if (currentScope) {
        return [currentScope];
    } else {
        return Object.keys(scopes).map((scopeKey) => (scopeKey.includes(key) ? scopeKey : ''));
    }
}
