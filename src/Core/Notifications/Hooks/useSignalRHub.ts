import { useState, useEffect, useCallback } from 'react';
import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr';
import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { useFramework } from '@equinor/fusion-framework-react';

interface SignalR {
    hubConnection: HubConnection | null;
    hubConnectionError: Error | null;
    isEstablishingHubConnection: boolean;
}

export function useSignalRHub(hubUrl: string): SignalR {
    const auth = useFramework().modules.auth;
    const service = useFramework().modules.serviceDiscovery;

    const [hubConnection, setHubConnection] = useState<HubConnection | null>(null);
    const [hubConnectionError, setHubConnectionError] = useState<Error | null>(null);
    const [isEstablishingHubConnection, setIsEstablishingHubConnection] = useState(false);

    const createHubConnectionAsync = useCallback(async () => {
        setHubConnectionError(null);
        const hubConnect = new HubConnectionBuilder()
            .withAutomaticReconnect()
            .withUrl(hubUrl, {
                accessTokenFactory: async () => {
                    const token = await auth.acquireAccessToken({
                        scopes: (await service.resolveService('notification')).defaultScopes,
                    });
                    if (!token) {
                        throw Error('failed to acquire access token');
                    }
                    return token;
                },
            })
            .build();
        try {
            await hubConnect.start();
            setHubConnection(hubConnect);
        } catch (e) {
            setHubConnectionError(e as Error);
        } finally {
            setIsEstablishingHubConnection(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        //getToken function should be here but is unstable and causes infinite loop
    }, [hubUrl]);

    useEffect(() => {
        createHubConnectionAsync();
        return () => {
            hubConnection === null || hubConnection === void 0 ? void 0 : hubConnection.stop();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createHubConnectionAsync]);

    return { hubConnection, hubConnectionError, isEstablishingHubConnection };
}
