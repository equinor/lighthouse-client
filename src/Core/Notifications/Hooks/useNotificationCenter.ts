import { useCallback, useEffect, useState } from 'react';
import { useSignalRHub } from './useSignalRHub';
import { useHttpClient } from '@equinor/portal-client';
import { useQuery, useQueryClient } from 'react-query';
import { getUnreadNotificationCardsAsync } from '../API/getUnreadNotifications';
import { getReadNotificationCardsAsync } from '../API/getReadNotifications';
import { Notification } from '../Types/Notification';
import { useNotificationQueryKeys } from './useNotificationQueryKeys';
import { NotificationList } from '../Types/NotificationList';
import { HubConnectionState } from '@microsoft/signalr';

interface NotificationCenter {
    isFetchingRead: boolean;
    isFetchingUnRead: boolean;
    isEstablishingHubConnection: boolean;
    unreadNotificationsCount: number;
    unreadNotificationCards: Notification[];
    readNotificationCards: Notification[];
    hubConnectionState: ConnectionState;
}

export type ConnectionState = 'Connected' | 'Reconnecting' | 'Disconnected';
export function useNotificationCenter(
    onNotification: (notification: Notification) => void
): NotificationCenter {
    const { fusion } = useHttpClient();
    const queryClient = useQueryClient();
    const { readKey, unreadKey } = useNotificationQueryKeys();
    const [state, setState] = useState<ConnectionState>('Disconnected');

    const { data: readNotifications, isFetching: isFetchingUnRead } = useQuery(readKey, () =>
        getReadNotificationCardsAsync()
    );
    const { data: unreadNotifications, isFetching: isFetchingRead } = useQuery(
        unreadKey,
        async () => {
            const notifications = await getUnreadNotificationCardsAsync();

            const intercepted: NotificationList = {
                ...notifications,
                value: [
                    { appKey: 'fusion', title: 'Im a fusion notification' },
                    { appKey: 'STID', title: 'New document' },
                    { appKey: 'scope change', title: 'Request ready to sign' },
                    { appKey: 'release control', title: 'Idk man' },
                    ...notifications.value,
                ],
            };
            return intercepted;
        }
    );

    const { hubConnection } = useSignalRHub(
        `${fusion.getBaseUrl()}/signalr/hubs/notifications/?negotiateVersion=1`,
        fusion.getAccessToken
    );

    const onNotificationRecieved = useCallback(
        (notification: Notification) => {
            onNotification && onNotification(notification);
            queryClient.invalidateQueries(unreadKey);
        },
        [onNotification, queryClient, unreadKey]
    );

    const onReconnecting = () => setState('Reconnecting');
    const onClose = () => setState('Disconnected');
    const onReconnected = () => setState('Connected');

    useEffect(() => {
        if (hubConnection) {
            hubConnection.state === HubConnectionState.Connected && setState('Connected');
            hubConnection.onclose(onClose);
            hubConnection.onreconnected(onReconnected);
            hubConnection.onreconnecting(onReconnecting);
            hubConnection.on('notifications', onNotificationRecieved);
            return () => hubConnection.off('notifications', onNotificationRecieved);
        }
    }, [hubConnection, onNotificationRecieved]);

    return {
        hubConnectionState: state,
        isFetchingRead,
        isFetchingUnRead,
        isEstablishingHubConnection: false,
        readNotificationCards: readNotifications?.value ?? [],
        unreadNotificationCards: unreadNotifications?.value || [],
        unreadNotificationsCount: unreadNotifications?.count || 0,
    };
}
