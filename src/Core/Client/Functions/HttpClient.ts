import { baseClient } from '@equinor/http-client';
import { HttpClients } from '../Types/HttpClients';
import { Scope } from '../Types/ScopeAndUrls';
import { getAuthProvider } from './getAuthProvider';
import { readAppConfig } from './Readers';

export interface HttpClientOptions {
    scope: string;
    baseUrl?: string;
}

export function httpClient(options?: HttpClientOptions): HttpClients {
    const appConfig = readAppConfig();
    const authProvider = getAuthProvider();

    const customScope = options?.scope || '';

    const apiClients = {
        customApi: baseClient(authProvider, [customScope]),
    };

    Object.keys(appConfig.urls).forEach((key) => {
        apiClients[key] = baseClient(authProvider, getScope(key, appConfig.scope));
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
