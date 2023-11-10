import { useFramework } from '@equinor/fusion-framework-react';
import { useHttpClient as useFrameworkClient } from '@equinor/fusion-framework-react/http';
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
export function useHttpClient(clientName: keyof HttpClients) {
    return useFrameworkClient(clientName);
}
