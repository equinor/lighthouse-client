import { AppConfig } from '@equinor/lighthouse-conf';
import { baseClient, BaseClient } from '../../../../packages/httpClient/src/baseClient';
import useClientContext from '../ClientContext/clientContext';

type Clients = {
    [key in keyof AppConfig]: BaseClient;
} & {
    customApi: BaseClient;
};

export function useApiClient(customScope?: string): Clients {
    const { appConfig, authProvider } = useClientContext();
    customScope = customScope || '';

    const apiClients = {
        customApi: baseClient(authProvider, [customScope]),
    };

    Object.keys(appConfig).forEach((key) => {
        apiClients[key] = baseClient(authProvider, [appConfig[key]]);
    });
    return apiClients as Clients;
}
