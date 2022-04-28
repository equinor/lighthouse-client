import { useCallback, useEffect, useState } from 'react';
import { useSignalRHub } from './useSignalRHub';
import { useHttpClient } from '@equinor/portal-client';
import { useQuery, useQueryClient } from 'react-query';
import { Notification } from '../Types/Notification';
import { HubConnectionState } from '@microsoft/signalr';
import { notificationQueries } from '../queries/notificationQueries';

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
    const [state, setState] = useState<ConnectionState>('Disconnected');

    const { getReadNotificationsQuery, getUnreadNotificationsQuery } = notificationQueries;

    const { data: readNotifications, isFetching: isFetchingRead } = useQuery<
        unknown,
        unknown,
        Notification[]
    >(getReadNotificationsQuery());
    const { data: unreadNotifications, isFetching: isFetchingUnRead } = useQuery<
        unknown,
        unknown,
        Notification[]
    >(getUnreadNotificationsQuery());

    const { hubConnection } = useSignalRHub(
        `${fusion.getBaseUrl()}/signalr/hubs/notifications/?negotiateVersion=1`,
        fusion.getAccessToken
    );

    const onNotificationRecieved = useCallback(
        (notification: Notification) => {
            onNotification && onNotification(notification);
            queryClient.invalidateQueries(getUnreadNotificationsQuery().queryKey);
        },
        [getUnreadNotificationsQuery, onNotification, queryClient]
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
        readNotificationCards: readNotifications || [],
        unreadNotificationCards: unreadNotifications || [],
        unreadNotificationsCount: unreadNotifications?.length || 0,
    };
}
