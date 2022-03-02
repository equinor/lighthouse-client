import { useCallback, useEffect, useMemo } from 'react';
import { useSignalRHub } from './useSignalRHub';
import { useHttpClient } from '@equinor/portal-client';
import { useQuery, useQueryClient } from 'react-query';
import { getUnreadNotificationCardsAsync } from '../API/getUnreadNotifications';
import { getReadNotificationCardsAsync } from '../API/getReadNotifications';
import { Notification } from '../Types/Notification';
import { useNotificationQueryKeys } from './useNotificationQueryKeys';

interface NotificationCenter {
    notificationCards: Notification[];
    isFetchingRead: boolean;
    isFetchingUnRead: boolean;
    isEstablishingHubConnection: boolean;
    unreadNotificationsCount: number;
}

export function useNotificationCenter(
    onNotification: (notification: Notification) => void
): NotificationCenter {
    const { fusion } = useHttpClient();

    const { readKey: read, unreadKey: unread } = useNotificationQueryKeys();

    const { data: readNotifications, isFetching: isFetchingUnRead } = useQuery(read, () =>
        getReadNotificationCardsAsync()
    );
    const { data: unreadNotifications, isFetching: isFetchingRead } = useQuery(unread, () =>
        getUnreadNotificationCardsAsync()
    );

    const { hubConnection } = useSignalRHub(
        `${fusion.getBaseUrl()}/signalr/hubs/notifications/?negotiateVersion=1`,
        fusion.getAccessToken
    );

    const queryClient = useQueryClient();
    const { unreadKey } = useNotificationQueryKeys();

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

    const notifications = useMemo(() => {
        return readNotifications?.value.concat(unreadNotifications?.value || []) || [];
    }, [readNotifications, unreadNotifications]);

    return {
        isFetchingRead,
        isFetchingUnRead,
        notificationCards: notifications,
        isEstablishingHubConnection: false,
        unreadNotificationsCount: unreadNotifications?.count || 0,
    };
}
