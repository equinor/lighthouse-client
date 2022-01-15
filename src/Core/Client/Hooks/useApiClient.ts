import { baseClient, BaseClient } from '../../../../packages/httpClient/src/baseClient';
import { useClientContext } from '../ClientContext/clientContext';
import { Scope } from '../Service/appConf';

type Clients = {
    [key in keyof Scope]: BaseClient;
} & {
    customApi: BaseClient;
};

export function useApiClient(customScope?: string): Clients {
    const { appConfig, authProvider } = useClientContext();
    customScope = customScope || '';

    const apiClients = {
        customApi: baseClient(authProvider, [customScope]),
    };

    Object.keys(appConfig.scope).forEach((key) => {
        apiClients[key] = baseClient(authProvider, [appConfig.scope[key]]);
    });
    return apiClients as Clients;
}
