import { useCallback, useEffect } from 'react';
import { useSignalRHub } from './useSignalRHub';
import { useHttpClient } from '@equinor/portal-client';
import { useQuery, useQueryClient } from 'react-query';
import { getUnreadNotificationCardsAsync } from '../API/getUnreadNotifications';
import { getReadNotificationCardsAsync } from '../API/getReadNotifications';
import { Notification } from '../Types/Notification';
import { useNotificationQueryKeys } from './useNotificationQueryKeys';

interface NotificationCenter {
    isFetchingRead: boolean;
    isFetchingUnRead: boolean;
    isEstablishingHubConnection: boolean;
    unreadNotificationsCount: number;
    unreadNotificationCards: Notification[];
    readNotificationCards: Notification[];
}

export function useNotificationCenter(
    onNotification: (notification: Notification) => void
): NotificationCenter {
    const { fusion } = useHttpClient();
    const queryClient = useQueryClient();
    const { readKey, unreadKey } = useNotificationQueryKeys();

    const { data: readNotifications, isFetching: isFetchingUnRead } = useQuery(
        readKey,
        () => getReadNotificationCardsAsync(),
        { cacheTime: 5 * 1000, refetchInterval: 5 * 1000 }
    );
    const { data: unreadNotifications, isFetching: isFetchingRead } = useQuery(unreadKey, () =>
        getUnreadNotificationCardsAsync()
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

    useEffect(() => {
        if (hubConnection) {
            hubConnection.on('notifications', onNotificationRecieved);
            return () => hubConnection.off('notifications', onNotificationRecieved);
        }
    }, [hubConnection, onNotificationRecieved]);

    return {
        isFetchingRead,
        isFetchingUnRead,
        isEstablishingHubConnection: false,
        readNotificationCards: readNotifications?.value ?? [],
        unreadNotificationCards: unreadNotifications?.value || [],
        unreadNotificationsCount: unreadNotifications?.count || 0,
    };
}
