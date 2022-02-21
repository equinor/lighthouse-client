import { httpClient } from '../Functions/HttpClient';
import { HttpClients } from '../Types/HttpClients';

/**
 * Hook for retrieving all Available HttpClients corresponding to the
 * url and scope provided by appConfiguration
 *
 * @param {string} [scope] Is required of customHttpClient is used,
 * @param {string} [baseUrl] is not required, but will require scope to be assigned
 * @return {} HttpClients available
 */
export function useHttpClient(scope?: string, baseUrl?: string): HttpClients {
    const customScope = scope ? { scope: scope || '', baseUrl } : undefined;
    const apiClients = httpClient(customScope);

    return apiClients as HttpClients;
}
