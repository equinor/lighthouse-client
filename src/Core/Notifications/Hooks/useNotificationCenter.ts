import { useEffect, useMemo } from 'react';
import { useSignalRHub } from './useSignalRHub';
import { useHttpClient } from '@equinor/portal-client';
import { useQuery } from 'react-query';
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

    const { read, unread } = useNotificationQueryKeys();

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

    useEffect(() => {
        if (hubConnection) {
            hubConnection.on('notifications', onNotification);
            return () => hubConnection.off('notifications', onNotification);
        }
    }, [hubConnection, onNotification]);

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
