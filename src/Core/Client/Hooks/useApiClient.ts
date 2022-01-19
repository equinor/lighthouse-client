import { baseClient } from '../../../../packages/httpClient/src/baseClient';
import { useClientContext } from '../ClientContext/clientContext';
import { HttpClients } from '../Types/HttpClients';

export function useApiClient(customScope?: string): HttpClients {
    const { appConfig, authProvider } = useClientContext();
    customScope = customScope || '';

    const apiClients = {
        customApi: baseClient(authProvider, [customScope]),
    };

    Object.keys(appConfig.scope).forEach((key) => {
        apiClients[key] = baseClient(authProvider, [appConfig.scope[key]]);
    });
    return apiClients as HttpClients;
}
