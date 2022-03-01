import { useState, useEffect, useCallback } from 'react';
import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr';

interface SignalR {
    hubConnection: HubConnection | null;
    hubConnectionError: Error | null;
    isEstablishingHubConnection: boolean;
}

export function useSignalRHub(hubUrl: string, getToken: () => Promise<string>): SignalR {
    const [hubConnection, setHubConnection] = useState<HubConnection | null>(null);
    const [hubConnectionError, setHubConnectionError] = useState<Error | null>(null);
    const [isEstablishingHubConnection, setIsEstablishingHubConnection] = useState(false);

    const createHubConnectionAsync = useCallback(async () => {
        setHubConnectionError(null);
        const hubConnect = new HubConnectionBuilder()
            .withAutomaticReconnect()
            .withUrl(hubUrl, {
                accessTokenFactory: async () => await getToken(),
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
    }, [hubUrl]);

    useEffect(() => {
        createHubConnectionAsync();
        return () => {
            hubConnection === null || hubConnection === void 0 ? void 0 : hubConnection.stop();
        };
    }, [createHubConnectionAsync, hubConnection]);

    return { hubConnection, hubConnectionError, isEstablishingHubConnection };
}
